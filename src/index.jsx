import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { urlParser } from './urlparse'
import './style.css'

const InEdit = ({ showDelete, label, onChange, onDelete, value }) => {
  return (
    <div className='row-fluid' >
      <div className='inedit span12' >
        <label className='inedit-label span2' >{label} : </label>
        <input className='inedit-input span10' onChange={onChange} type='text' value={value} />
        <span className='remove' style={{ display: showDelete ? 'inline' : 'none' }} onClick={onDelete} >
          <i className='icon icon-minus-circled' />
        </span>
      </div>
    </div>
  )
}

const AutoResizeInput = ({ inputChange, placeholder, value }) => {
  const inputEl = useRef(null)

  const onChange = (e) => {
    if (inputChange) {
      inputChange(e)
    }

    const input = inputEl.current
    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
  }

  useEffect(() => {
    const input = inputEl.current

    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'

    var nodeValLen = input.value.length
    if (input.setSelectionRange) {
      input.setSelectionRange(nodeValLen, nodeValLen)
      input.focus()
    }
  })

  return (<textarea ref={inputEl} className='input' onChange={onChange} placeholder={placeholder} value={value} />)
}

const Sidebar = () => {
  return (
    <div className='span2 sidebar'>
      <div className='logo page-header'>
        <i className='icon-hammer' />
        <h4>URL Hammer</h4>
      </div>
      <ul className='unstyled links'>
        <li>
          <a href='https://github.com/jserme/url-hammer'><i className='icon-github-circled' />Github</a>
        </li>
        <li>
          <a href='http://weibo.com/ihubo'><i className='icon-weibo' />Weibo</a>
        </li>
      </ul>
    </div>
  )
}

const UrlInput = ({ initUrl, inputChange }) => {
  const onChange = (evt) => {
    inputChange(evt.target.value)
  }

  return (
    <div className='url-input'>
      <AutoResizeInput inputChange={onChange} placeholder='Type or paste a url here..' value={initUrl} />
    </div>
  )
}

const DisplayPanel = ({ onChange, onDelete, onAdd, data, name }) => {
  const [uiState, setUIState] = useState({
    hideEmpty: false,
    showEditForm: false
  })

  const setHide = () => {
    setUIState({
      hideEmpty: !uiState.hideEmpty
    })
  }

  const setForm = () => {
    setUIState({
      showEditForm: !uiState.showEditForm
    })
  }

  // onAdd: function () {
  //   var key = this.refs.key.getDOMNode().value.replace(/^\s+|\s+$/, '')
  //   var val = this.refs.val.getDOMNode().value

  //   if (key == '') {
  //     return alert('key should not be empty')
  //   }

  //   this.props.onAdd(key, val)
  //   setUIState({
  //     showEditForm: false
  //   })
  // },

  var list
  if (data && Object.keys(data).length > 0) {
    list = []
    Object.keys(data).forEach((v, index) => {
      if (!uiState.hideEmpty || data[v] !== '') {
        list.push(
          <InEdit
            key={index}
            label={v}
            value={data[v]}
            showDelete
            onChange={() => { onChange(v) }}
            onDelete={() => { onDelete(v) }} />
        )
      }
    })
  } else {
    list = 'no ' + name + ' found'
  }

  var editForm = ''
  if (uiState.showEditForm) {
    editForm = (
      <form className='displayPanel-edit-form'>
        <label >key: </label><input autoFocus ref='key' type='text' />
        <br />
        <label >val: </label><input ref='val' type='text' />
        <br />
        <input className='btn' onClick={onAdd} type='button' value='confirm' />
      </form>
    )
  }

  return (
    <div>
      <div className='list-header'>
        <h4>{name}
          <span className='des' onClick={setForm}>{uiState.showEditForm ? '-' : '+'}</span>
        </h4>
        {editForm}
        <span className='setHide'>
          <label>
            <input type='checkbox' onChange={setHide} /> hide empty {name}
          </label>
        </span>
      </div>
      {list}
    </div>
  )
}

const Content = ({ onChange, urlObj, initUrl, inputChange }) => {
  const onFullPathChange = (evt) => {
    urlObj.fullpath = evt.target.value
    onChange(urlObj)
  }

  const onQueryChange = (key, val) => {
    urlObj.queryObj[key] = val
    onChange(urlObj)
  }

  const onQueryDelete = (key) => {
    delete urlObj.queryObj[key]
    onChange(urlObj)
  }

  const onQueryAdd = (key, val) => {
    if (urlObj.queryObj[key]) {
      urlObj.queryObj[key] += ',' + val
    } else {
      urlObj.queryObj[key] = val
    }

    onChange(urlObj)
  }

  const onFragmentChange = (key, val) => {
    urlObj.fragmentObj[key] = val
    onChange(urlObj)
  }

  const onFragmentDelete = (key, val) => {
    delete urlObj.fragmentObj[key]
    onChange(urlObj)
  }

  const onFragmentAdd = (key, val) => {
    if (urlObj.fragmentObj[key]) {
      urlObj.fragmentObj[key] += ',' + val
    } else {
      urlObj.fragmentObj[key] = val
    }

    onChange(urlObj)
  }

  return (
    <div className='span10 content'>
      <UrlInput {...{ inputChange, initUrl }} />
      <InEdit
        value={urlObj.fullpath}
        onChange={onFullPathChange}
        label='fullpath' />
      <DisplayPanel
        onChange={onQueryChange}
        onDelete={onQueryDelete}
        onAdd={onQueryAdd}
        data={urlObj.queryObj}
        name='Querys' />
      <DisplayPanel
        onChange={onFragmentChange}
        onDelete={onFragmentDelete}
        onAdd={onFragmentAdd}
        data={urlObj.fragmentObj}
        name='Fragment' />
    </div>
  )
}

const App = () => {
  var url = 'http://jser.me:80?from=jser&to=me#hello=world&test=1'
  var curUrlObj = urlParser.parse(location.href)
  if (curUrlObj.fragmentObj && curUrlObj.fragmentObj.r) {
    url = decodeURIComponent(curUrlObj.fragmentObj.r)
  }

  const [urlState, setUrlState] = useState({
    url: url,
    urlObj: urlParser.parse(url)
  })

  const remberCurUrl = (val) => {
    location.hash = 'r=' + encodeURIComponent(val)
  }

  const inputChange = (val) => {
    var urlObj
    if (val === '') {
      urlObj = {}
    } else {
      urlObj = urlParser.parse(val)
    }

    setUrlState({
      url: val,
      urlObj: urlObj
    })

    remberCurUrl(val)
  }

  const onChange = (urlObj) => {
    var url = urlParser.format(urlObj)

    setUrlState({
      urlObj: urlObj,
      url: url
    })

    remberCurUrl(url)
  }

  return (
    <div className='container-fluid'>
      <div className='row-fluid' >
        <Sidebar />
        <Content
          onChange={onChange}
          initUrl={urlState.url}
          urlObj={urlState.urlObj}
          inputChange={inputChange} />
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))

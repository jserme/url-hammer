import React, { useState, useRef } from 'react'
import { InEdit } from './InEdit'
export const DisplayPanel = ({ onChange, onDelete, onAdd, data, name }) => {
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

  const formKey = useRef(null)
  const formVal = useRef(null)

  const add = () => {
    var key = formKey.current.value.replace(/^\s+|\s+$/, '')
    var val = formVal.current.value
    if (key === '') {
      return alert('key should not be empty')
    }
    onAdd(key, val)
    setUIState({
      showEditForm: false
    })
  }

  let list
  if (data && Object.keys(data).length > 0) {
    list = []
    Object.keys(data).forEach((v, index) => {
      if (!uiState.hideEmpty || data[v] !== '') {
        list.push(<InEdit
          key={index}
          label={v}
          value={data[v]}
          showDelete
          onChange={() => { onChange(v) }}
          onDelete={() => { onDelete(v) }}
        />)
      }
    })
  } else {
    list = 'no ' + name + ' found'
  }

  return (<div>
    <div className='list-header'>
      <h4>{name}
        <span className='des' onClick={setForm}>{uiState.showEditForm ? '-' : '+'}</span>
      </h4>
      {
        uiState.showEditForm
          ? (
            <form className='displayPanel-edit-form'>
              <label>key: </label><input autoFocus ref={formKey} type='text' />
              <br />
              <label>val: </label><input ref={formVal} type='text' />
              <br />
              <input className='btn' onClick={add} type='button' value='confirm' />
            </form>
          ) : ''

      }
      <span className='setHide'>
        <label>
          <input type='checkbox' onChange={setHide} /> hide empty {name}
        </label>
      </span>
    </div>
    {list}
  </div>)
}

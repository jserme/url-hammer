import React, { useState } from 'react'
import { render } from 'react-dom'
import { urlParser } from './urlparse'
import './style.css'
import { Sidebar } from './Sidebar'
import { Content } from './Content'

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

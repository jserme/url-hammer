import React from 'react'
import { UrlInput } from './UrlInput'
import { InEdit } from './InEdit'
import { DisplayPanel } from './DisplayPanel'
export const Content = ({ onChange, urlObj, initUrl, inputChange }) => {
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
  return (<div className='span10 content'>
    <UrlInput {...{ inputChange, initUrl }} />
    <InEdit value={urlObj.fullpath} onChange={onFullPathChange} label='fullpath' />
    <DisplayPanel onChange={onQueryChange} onDelete={onQueryDelete} onAdd={onQueryAdd} data={urlObj.queryObj} name='Querys' />
    <DisplayPanel onChange={onFragmentChange} onDelete={onFragmentDelete} onAdd={onFragmentAdd} data={urlObj.fragmentObj} name='Fragment' />
  </div>)
}

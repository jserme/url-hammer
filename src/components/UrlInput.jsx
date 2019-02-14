import React from 'react'
import { AutoResizeInput } from './AutoResizeInput'
export const UrlInput = ({ initUrl, inputChange }) => {
  const onChange = (evt) => {
    inputChange(evt.target.value)
  }
  return (<div className='url-input'>
    <AutoResizeInput inputChange={onChange} placeholder='Type or paste a url here..' value={initUrl} />
  </div>)
}

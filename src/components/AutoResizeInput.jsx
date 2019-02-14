import React, { useEffect, useRef } from 'react'
export const AutoResizeInput = ({ inputChange, placeholder, value }) => {
  const inputEl = useRef(null)
  const onChange = (e) => {
    if (inputChange) {
      inputChange(e)
    }
    const input = inputEl.current
    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
  };
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
};

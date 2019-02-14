import React from 'react'
export const InEdit = ({ showDelete, label, onChange, onDelete, value }) => {
  return (<div className='row-fluid'>
    <div className='inedit span12'>
      <label className='inedit-label span2'>{label} : </label>
      <input className='inedit-input span10' onChange={onChange} type='text' value={value} />
      <span className='remove' style={{ display: showDelete ? 'inline' : 'none' }} onClick={onDelete}>
        <i className='icon icon-minus-circled' />
      </span>
    </div>
  </div>)
}

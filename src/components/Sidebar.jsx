import React from 'react'
export const Sidebar = () => {
  return (<div className='span2 sidebar'>
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
  </div>)
};

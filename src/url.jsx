var InEdit = React.createClass({
  render : function(){
    var style = {
      display: this.props.showDelete  ? 'inline' : 'none'
    }

    return (
      <div className="row-fluid" >
        <div className="inedit span12" >
          <label className="inedit-label span2" >{this.props.label} : </label>
          <input className="inedit-input span10" onChange={this.props.onChange} type="text" value={this.props.value} />
          <span className="remove" style={style} onClick={this.props.onDelete} >
              <i className="icon icon-minus-circled"></i>
          </span>
        </div>
      </div>
    )
  }
})

var AutoResizeInput = React.createClass({
  inputChange : function(evt){
    if(this.props.inputChange) {
      this.props.inputChange(evt)
    }

    var input = this.getDOMNode()

    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
  },
  componentDidMount : function(){
    var input = this.getDOMNode()

    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
  },
  render : function(){
    return <textarea className="input"  onChange={this.inputChange} placeholder={this.props.placeholder} value={this.props.value}></textarea>
  }
})

var Sidebar = React.createClass({
 render : function(){
  return (
      <div className="span2 sidebar">
          <div className="logo page-header">
              <i className="icon-hammer"></i>
              <h4>URL Hammer</h4>
          </div>
          <ul className="unstyled links">
              <li>
                 <a href="https://github.com/jserme/uri-hammer"><i className="icon-github-circled"></i>Github</a>
              </li>
              <li>
                 <a href="http://weibo.com/ihubo"><i className="icon-weibo"></i>Weibo</a>
              </li>
          </ul>
      </div>
  )
 }
})

var UrlInput = React.createClass({
  inputChange : function(evt){
    this.props.inputChange(evt.target.value)
  },

  render : function() {
    return (
      <div className="url-input">
        <AutoResizeInput inputChange={this.inputChange}  placeholder="Type or paste a url here.." value={this.props.initUrl}/>
      </div>
    )
  }
})

var DisplayPanel = React.createClass({
  getInitialState : function(){
    return {
      hideEmpty: false,
      showEditForm: false
    }
  },

  setHide: function(){
    this.setState({
      hideEmpty: !this.state.hideEmpty
    })
  },

  setForm: function(){
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  },

  handleChange: function(key, evt){
    this.props.onChange(key, evt.target.value)
  },

  handleDelete: function(key){
    this.props.onDelete(key)
  },

  onAdd: function(){
    var key = this.refs.key.getDOMNode().value.replace(/^\s+|\s+$/, '')
    var val = this.refs.val.getDOMNode().value

    if(key == '') {
      return alert('key should not be empty')
    }

    this.props.onAdd(key, val)
    this.setState({
      showEditForm:false
    })
  },

  render: function(){
    var list
    if(this.props.data && Object.keys(this.props.data).length > 0){
      list = []
      Object.keys(this.props.data).forEach(function(v){
        if(!this.state.hideEmpty|| this.props.data[v]!== '') {
          list.push(
            <InEdit
              label={v}
              value={this.props.data[v]}
              showDelete={true}
              onChange={this.handleChange.bind(this, v)}
              onDelete={this.handleDelete.bind(this,v)} />
          )
        }
      }.bind(this))
    } else {
      list = 'no '+ this.props.name +' found'
    }

    var editForm = ''
    if(this.state.showEditForm) {
      editForm = (
        <form className="displayPanel-edit-form">
          <label >key: </label><input ref="key" type="text"/>
          <br />
          <label >val: </label><input ref="val" type="text" />
          <br />
          <input className="btn" onClick={this.onAdd} type="button" value="confirm" />
        </form>
      )
    }

    return (
      <div>
          <div className="list-header">
              <h4>{this.props.name}
                  <span className="des" onClick={this.setForm}>{this.state.showEditForm ? '-' : '+'}</span>
              </h4>
              {editForm}
              <span className="setHide">
                  <label>
                      <input type="checkbox" onChange={this.setHide} />
                      hide empty {this.props.name}
                  </label>
              </span>
          </div>
          {list}
      </div>
      )
  }
})

var Content = React.createClass({
  onFullPathChange: function(evt){
    var urlObj = this.props.urlObj
    urlObj.fullpath = evt.target.value

    this.props.onChange(urlObj)
  },

  onQueryChange:function(key, val){
    var urlObj = this.props.urlObj
    urlObj.queryObj[key] = val

    this.props.onChange(urlObj)

  },
  onQueryDelete:function(key){
    var urlObj = this.props.urlObj
    delete urlObj.queryObj[key]

    this.props.onChange(urlObj)
  },
  onQueryAdd:function(key, val){
    var urlObj = this.props.urlObj
    if(urlObj.queryObj[key]) {
      urlObj.queryObj[key] += ',' + val
    } else {
      urlObj.queryObj[key] = val
    }

    this.props.onChange(urlObj)
  },
  onFragmentChange: function(key, val){
    var urlObj = this.props.urlObj
    urlObj.fragmentObj[key] = val

    this.props.onChange(urlObj)
  },
  onFragmentDelete: function(key, val){
    var urlObj = this.props.urlObj
    delete urlObj.fragmentObj[key]

    this.props.onChange(urlObj)
  },
  onFragmentAdd:function(key, val){
    var urlObj = this.props.urlObj
    if(urlObj.fragmentObj[key]) {
      urlObj.fragmentObj[key] += ',' + val
    } else {
      urlObj.fragmentObj[key] = val
    }

    this.props.onChange(urlObj)
  },
  render : function(){
    return (
      <div className="span10 content">
          <UrlInput {...this.props}/>
          <InEdit
            value={this.props.urlObj.fullpath}
            onChange={this.onFullPathChange}
            label="fullpath" />
          <DisplayPanel
            onChange={this.onQueryChange}
            onDelete={this.onQueryDelete}
            onAdd={this.onQueryAdd}
            data={this.props.urlObj.queryObj}
            name="Querys" />
          <DisplayPanel
            onChange={this.onFragmentChange}
            onDelete={this.onFragmentDelete}
            onAdd={this.onFragmentAdd}
            data={this.props.urlObj.fragmentObj}
            name="Fragment" />
      </div>
    )
  }
})

var App = React.createClass({
  getInitialState : function(){
    var url = "http://jser.me:80?from=jser&to=me#hello=world&test=1"
    var curUrlObj = urlParser.parse(location.href)
    if(curUrlObj.fragmentObj.r) {
      url = decodeURIComponent(curUrlObj.fragmentObj.r)
    }

    return {
      url:url,
      urlObj : urlParser.parse(url)
    }
  },
  remberCurUrl : function(val){
    location.hash = 'r=' + encodeURIComponent(val)
  },
  inputChange : function(val){
    var urlObj
    if(val == '') {
      urlObj = {}
    } else {
      urlObj = urlParser.parse(val)
    }

    this.setState({
      url : val,
      urlObj : urlObj
    })

    this.remberCurUrl(val)
  },
  onChange : function(urlObj){
    var url = urlParser.format(urlObj)

    this.setState({
      urlObj : urlObj,
      url: url
    })

    this.remberCurUrl(url)
  },

  render: function(){
    return (
      <div className="container-fluid">
        <div className="row-fluid" >
          <Sidebar />
          <Content
            paramsChange={this.onParamsChange}
            onChange={this.onChange}
            initUrl={this.state.url}
            urlObj={this.state.urlObj}
            inputChange={this.inputChange} />
        </div>
      </div>
    )
  }
})

React.render(<App/>, document.getElementById('App'))

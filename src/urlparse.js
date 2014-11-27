(function() {
  function unparam(query) {
    var queryObj = {}
    var kv = query.split('&')
    var keyVal
    var temp

    for (var i = 0; i < kv.length; i++) {
      keyVal = kv[i].split('=')
      if (keyVal[1] === undefined) {
        keyVal[1] = ''
      }

      temp = queryObj[keyVal[0]]
      if (temp !== undefined) {
        queryObj[keyVal[0]] += ',' + keyVal[1]
      } else {
        queryObj[keyVal[0]] = keyVal[1]
      }
    }

    return queryObj
  }

  function parseURL(url) {
    var o = {}

    var temp = url.split(/#+/)
    if (temp[0]) {
      o.fullpathWithQuery = temp[0]
    }

    if (temp[1]) {
      o.fragment = temp[1]
      o.fragmentObj = unparam(o.fragment)
    }

    temp = o.fullpathWithQuery.split(/\?+/)
    if (temp[0]) {
      o.fullpath = temp[0]
    }

    if (temp[1]) {
      o.query = temp[1]
      o.queryObj = unparam(o.query)
    }

    return o
  }

  function formatURL(o) {
    var url = ''
    var key
    var querys = []
    var fragment = []
    url += o.fullpath

    if (o.queryObj) {
      for (key in o.queryObj) {
        querys.push(key + '=' + o.queryObj[key])
      }

      url += '?'
      url += querys.join('&')
    }

    if (o.fragmentObj) {
      for (key in o.fragmentObj) {
        fragment.push(key + '=' + o.fragmentObj[key])
      }
      url += '#'
      url += fragment.join('&')
    }

    return url
  }

  window.urlParser = {
    parse: parseURL,
    format: formatURL
  }
})()


//console.log(formatURL(parseURL('http://jser.me:80?from=jser&to=me&from=123#hello=world&test=1')))

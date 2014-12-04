(function(root) {
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

    var isQueryStart = false
    var isQueryEnd = false
    var isFragmentStart = false
    var fullpath = ''
    var query = ''
    var fragment = ''
    var cur = 0
    var curChar

    while (curChar = url.charAt(cur++)) {
      if (curChar === '?' && !isQueryStart && !isQueryEnd) {
        isQueryStart = true
        continue
      }

      if (curChar == '#' && !isFragmentStart) {
        isFragmentStart = true
        isQueryStart = false
        isQueryEnd = true
        continue
      }

      if (!isQueryStart && !isFragmentStart) {
        fullpath += curChar
      }

      if (isQueryStart && !isQueryEnd) {
        query += curChar
      }

      if (isFragmentStart) {
        fragment += curChar
      }
    }

    if (query !== '') {
      o.query = query
      o.queryObj = unparam(query)
    }

    o.fullpathWithQuery = query ? fullpath + '?' + query : fullpath

    if (fragment !== '') {
      o.fragment = fragment
      o.fragmentObj = unparam(o.fragment)
    }

    o.fullpath = fullpath
    return o
  }

  function isEmptyObj(obj) {
    var rst = true
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        rst = false
        break
      }
    }
    return rst
  }

  function formatURL(o) {
    var url = ''
    var key
    var querys = []
    var fragment = []
    url += o.fullpath

    if (o.queryObj && !isEmptyObj(o.queryObj)) {
      url += '?'
      for (key in o.queryObj) {
        querys.push(key + '=' + o.queryObj[key])
      }

      url += querys.join('&')
    }

    if (o.fragmentObj && !isEmptyObj(o.fragmentObj)) {
      url += '#'
      for (key in o.fragmentObj) {
        fragment.push(key + '=' + o.fragmentObj[key])
      }

      url += fragment.join('&')
    }

    return url
  }

  var urlParser = {
    parse: parseURL,
    format: formatURL
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = urlParser;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return urlParser;
      });
    } else {
      root.urlParser = urlParser;
    }
  }
})(this)

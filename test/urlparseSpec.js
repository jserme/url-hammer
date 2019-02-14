/* eslint-env mocha */
var urlParser = require('../src/urlparse.js')
var should = require('should')

describe('urlparse', function () {
  describe('parse', function () {
    it('normal url', function () {
      urlParser.parse('http://jser.me:80?from=jser&to=me#hello=world&test=1')
        .should.eql({
          fullpath: 'http://jser.me:80',
          query: 'from=jser&to=me',
          fragment: 'hello=world&test=1',
          fullpathWithQuery: 'http://jser.me:80?from=jser&to=me',
          queryObj: {
            from: 'jser',
            to: 'me'
          },
          fragmentObj: {
            hello: 'world',
            test: '1'
          }
        })

      urlParser.parse('http://jser.me:80?from=jser&to=me&to=lili#hello=world&test=1')
        .should.eql({
          fullpath: 'http://jser.me:80',
          query: 'from=jser&to=me&to=lili',
          fullpathWithQuery: 'http://jser.me:80?from=jser&to=me&to=lili',
          fragment: 'hello=world&test=1',
          queryObj: {
            from: 'jser',
            to: 'me,lili'
          },
          fragmentObj: {
            hello: 'world',
            test: '1'
          }
        })
    })

    it('no fragment', function () {
      urlParser.parse('http://jser.me:80?from=jser&to=me&to=lili')
        .should.eql({
          fullpath: 'http://jser.me:80',
          query: 'from=jser&to=me&to=lili',
          fullpathWithQuery: 'http://jser.me:80?from=jser&to=me&to=lili',
          queryObj: {
            from: 'jser',
            to: 'me,lili'
          }
        })
    })

    it('no query', function () {
      urlParser.parse('http://jser.me:80#hello=world&test=1')
        .should.eql({
          fullpath: 'http://jser.me:80',
          fragment: 'hello=world&test=1',
          fullpathWithQuery: 'http://jser.me:80',
          fragmentObj: {
            hello: 'world',
            test: '1'
          }
        })
    })

    it('two # url', function () {
      urlParser.parse('http://jser.me:80?from=jser&to=me#hello=world#&test=1')
        .should.eql({
          fullpath: 'http://jser.me:80',
          fragment: 'hello=world#&test=1',
          fullpathWithQuery: 'http://jser.me:80?from=jser&to=me',
          query: 'from=jser&to=me',
          queryObj: {
            from: 'jser',
            to: 'me'
          },
          fragmentObj: {
            hello: 'world#',
            test: '1'
          }
        })
    })

    it('two ? url', function () {
      urlParser.parse('http://jser.me:80?from=jser?&to=me#hello=world&test=1')
        .should.eql({
          fullpath: 'http://jser.me:80',
          fragment: 'hello=world&test=1',
          fullpathWithQuery: 'http://jser.me:80?from=jser?&to=me',
          query: 'from=jser?&to=me',
          queryObj: {
            from: 'jser?',
            to: 'me'
          },
          fragmentObj: {
            hello: 'world',
            test: '1'
          }
        })
    })
  })

  describe('format', function () {
    it('normal url', function () {
      urlParser.format({
        fullpath: 'http://jser.me:80',
        fragment: 'hello=world#&test=1',
        fullpathWithQuery: 'http://jser.me:80?from=jser&to=me',
        query: 'from=jser&to=me',
        queryObj: {
          from: 'jser',
          to: 'me'
        },
        fragmentObj: {
          hello: 'world#',
          test: '1'
        }
      }).should.eql('http://jser.me:80?from=jser&to=me#hello=world#&test=1')
    })
  })
})

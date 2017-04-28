'use strict'

const assert = require('assert')
const promisify = require('..')

describe('callback-and-promise', function () {
  describe('fn.name', function () {
    function someCrazyName () {}

    it('should set function name by default', function () {
      assert.equal('someCrazyName', promisify(someCrazyName).name)
    })

    it('should set name to empty', function () {
      assert.equal('', promisify(function () {}).name)
    })
  })

  describe('fn(callback(err)', function () {
    function fn (cb) {
      setTimeout(function () {
        cb(new Error('boom'))
      }, 0)
    }

    it('promise', function () {
      return promisify(fn).then(function () {
        throw new Error('bang')
      }).catch(function (err) {
        assert.equal(err.message, 'boom')
      })
    })
  })

  describe('fn(callback(null, value))', function () {
    function fn (cb) {
      cb(null, true)
    }

    it('promise', function () {
      return promisify(fn).then(function (val) {
        assert.equal(val, true)
      })
    })
  })

  describe('fn(callback(null, values...))', function () {
    function fn (cb) {
      cb(null, 1, 2, 3)
    }

    it('promise', function () {
      return promisify(fn).then(function (values) {
        assert.deepEqual(values, [1, 2, 3])
      })
    })
  })

  describe('fn(..args, callback())', function () {
    function fn (a, b, c, cb) {
      cb(null, a, b, c)
    }

    it('promise', function () {
      return promisify(fn, 1, 2, 3).then(function (values) {
        assert.deepEqual(values, [1, 2, 3])
      })
    })
  })
})

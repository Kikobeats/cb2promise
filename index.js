'use strict'

// TODO: Use mimicFn for inheritance fn name.
// TODO: Use sliced for copy arguments

const sliced = require('sliced')

module.exports = function (fn) {
  return (function () {
    var self = this
    var len = arguments.length

    var lastType = typeof arguments[len - 1]

    if (lastType === 'function') {
      return fn.apply(self, arguments)
    }

    var args = sliced(arguments)

    return new Promise(function (resolve, reject) {
      args[len] = createCallback(resolve, reject)
      fn.apply(self, args)
    })
  }())
}

function createCallback (resolve, reject) {
  return function (err, value) {
    if (err) return reject(err)
    var args = sliced(arguments, 1, arguments.length)
    return resolve.apply(null, args)
  }
}

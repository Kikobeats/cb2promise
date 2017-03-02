'use strict'

var Promise = require('pinkie-promise')
var sliced = require('sliced')

function cb2promise () {
  var args = sliced(arguments)
  var fn = args.shift()
  var resolve
  var reject

  function callbackHandle () {
    var err
    args = sliced(arguments)
    err = args.shift()
    return (!err) ? resolve.apply(null, args) : reject(err)
  };

  function promiseFactory (resolvePromise, rejectPromise) {
    resolve = resolvePromise
    reject = rejectPromise
    return fn.apply(null, args)
  }

  args.push(callbackHandle)

  return new Promise(promiseFactory)
};

module.exports = cb2promise

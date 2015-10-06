'use strict'

Promise = require 'pinkie-promise'

module.exports =  ->

  args = Array.prototype.slice.call arguments
  fn = args.shift()

  resolve = null
  reject = null

  callbackHandle = ->
    args = Array.prototype.slice.call arguments
    err = args.shift()
    if err then reject err else resolve.apply null, args

  args.push callbackHandle

  new Promise (resolvePromise, rejectPromise) ->
    resolve = resolvePromise
    reject = rejectPromise
    fn.apply null, args

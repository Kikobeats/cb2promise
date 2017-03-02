cb2promise = require '../index.js'
should     = require 'should'
sampleFunction = (done) -> done null, 'hello world'

describe 'cb2promise ::', ->

  it 'convert cb interface into promise', () ->
    promise = cb2promise(sampleFunction)
    promise.then (message) ->
      message.should.be.equal 'hello world'

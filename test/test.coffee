cb2promise = require '..'
should     = require 'should'
sampleFunction = (done) -> done null, 'hello world'

describe 'cb2promise ::', ->

  it 'convert cb interface into promise', (done) ->
    promise = cb2promise(sampleFunction)
    promise.then (message) ->
      message.should.be.equal 'hello world'
      done()

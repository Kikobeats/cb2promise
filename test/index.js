'use strict'

const cb2promise = require('..')
const should = require('should')

function sampleFn (done) {
  return done(null, 'hello world')
}

describe('cb2promise', function () {
  it('convert cb interface into promise', function (done) {
    const promise = cb2promise(sampleFn)

    console.log(promise)

    promise
    .then(message => {
      should(message).be.equal('hello world')
      done()
    })
    .catch(done)
  })
})

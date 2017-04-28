'use strict'

const promisify = require('es6-promisify')
const bench = require('nanobench')
const cb2promise = require('./')
const pify = require('pify')
const bluebird = require('bluebird')

function fn (a, b, c, d, e, f, g, h, i, j, k, cb) {
  cb(null, a, b, c, d, e, f, g, h, i, j, k)
}

bench('cb2promise', function (b) {
  b.start()
  cb2promise(fn, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10).then(b.end)
})

bench('pify', function (b) {
  b.start()
  pify(fn)(1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10).then(b.end)
})

bench('es6-promisify', function (b) {
  b.start()
  promisify(fn)(1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10).then(b.end)
})

bench('bluebird', function (b) {
  b.start()
  bluebird.promisify(fn)(1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10).then(b.end)
})

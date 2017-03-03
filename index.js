/* eslint-disable no-eval */
var assert = require('assert')

module.exports = nanotick
var delay = (typeof window !== 'undefined' && window.document)
  ? (typeof setImmediate !== 'undefined')
    ? setImmediate
    : setTimeout
  : eval('process.nextTick')

// Process.nextTick() batching ulity
// null -> fn(any) -> fn(any)
function nanotick () {
  var callbacks = []
  var interval = false

  return function tick (cb) {
    assert.equal(typeof cb, 'function', 'nanotick.tick: cb should be a function')

    var isAsync = false

    executeAsync(function () {
      isAsync = true
    })

    return function wrappedTick () {
      var length = arguments.length
      var args = new Array(length)
      for (var i = 0; i < length; i++) args[i] = arguments[i]

      if (isAsync) {
        cb.apply(cb, args)
      } else {
        executeAsync(function () {
          cb.apply(cb, args)
        })
      }
    }
  }

  function executeAsync (cb) {
    callbacks.push(cb)

    if (!interval) {
      interval = true
      delay(function () {
        while (callbacks.length > 0) {
          callbacks.shift()()
        }
        interval = false
      })
    }
  }
}

var assert = require('assert')

module.exports = nanotick

// A helper for delaying the execution of a function.
// (any... -> any) -> void
var delayed = typeof setImmediate !== 'undefined' ? setImmediate
  : typeof process !== 'undefined' ? process.nextTick
  : /* otherwise fallback */ setTimeout

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
      var args = []
      for (var i = 0; i < length; i++) {
        args.push[arguments[i]]
      }

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
      delayed(function () {
        var length = callbacks.length
        for (var i = 0; i < length; i++) {
          callbacks[i]()
        }
        interval = false
      })
    }
  }
}

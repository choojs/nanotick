var test = require('tape')
var nanotick = require('./')

test('nanotick', function (t) {
  t.test('should assert input types', function (t) {
    t.plan(1)
    var tick = nanotick()
    t.throws(tick.bind(null), /function/)
  })

  t.test('async functions should resolve in the same tick', function (t) {
    t.plan(1)

    var oops = false
    process.nextTick(function () {
      process.nextTick(function () {
        oops = true
      })
    })

    var tick = nanotick()
    var fn = tick(function () {
      t.equal(oops, false)
    })

    process.nextTick(fn)
  })

  t.test('sync function should resolve in the next tick', function (t) {
    t.plan(1)

    var oops = false
    process.nextTick(function () {
      process.nextTick(function () {
        oops = true
      })
    })

    var tick = nanotick()
    var fn = tick(function () {
      t.equal(oops, false)
    })

    fn()
  })

  t.test('is able to push more values onto the same tick from within a tick', function (t) {
    t.plan(2)

    var changed = false
    process.nextTick(function () {
      process.nextTick(function () {
        changed = true
      })
    })

    var tick = nanotick()
    ;(tick(function () {
      t.equal(changed, false)

      ;(tick(function () {
        t.equal(changed, false)
      }))()
    }))()
  })

  t.test('scheduled functions should be cleared after their execution', function (t) {
    t.plan(1)

    var numCalls = 0
    var tick = nanotick()

    // Arrange for a function to be called on the first tick
    tick(function () {
      ++numCalls
    })()

    process.nextTick(function () {
      // Arrange for another function to be called on the second tick
      tick(function () {
      })()
      process.nextTick(function () {
        t.equal(numCalls, 1, 'There should only be one call to a scheduled function')
      })
    })
  })
})

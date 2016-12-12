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
})

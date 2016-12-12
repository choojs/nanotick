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
    nextTick(function () {
      nextTick(function () {
        oops = true
      })
    })

    var tick = nanotick()
    var fn = tick(function () {
      t.equal(oops, false)
    })

    nextTick(function () {
      fn()
    })
  })
})

function nextTick (fn) {
  setTimeout(fn, 0)
}

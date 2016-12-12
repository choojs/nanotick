var test = require('tape')
var nanotick = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  var tick = nanotick()
  t.throws(tick.bind(null), /function/)
})

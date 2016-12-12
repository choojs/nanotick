# nanotick [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Process.nextTick() batching utility.

## Usage
```js
var nanotick = require('nanotick')

var tick = nanotick()

var myFunc = tick(function () {
  // do sync thing
})

// now resolves async
myFunc()
```

## API
### tick = nanotick
Create a new nanotick instance

### tick(cb)
Always resolve a function asynchronously. Uses batching under the hood to
optimize performance

## Installation
```sh
$ npm install nanotick
```

## See Also
- [yoshuawuyts/nanoraf](https://github.com/yoshuawuyts/nanoraf)
- [yoshuawuyts/nanomorph](https://github.com/yoshuawuyts/nanomorph)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanotick.svg?style=flat-square
[3]: https://npmjs.org/package/nanotick
[4]: https://img.shields.io/travis/yoshuawuyts/nanotick/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/nanotick
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/nanotick/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/nanotick
[8]: http://img.shields.io/npm/dm/nanotick.svg?style=flat-square
[9]: https://npmjs.org/package/nanotick
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard

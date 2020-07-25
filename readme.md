# utf8-transcoder
Transcode JavaScript strings <> [UTF-8](http://en.wikipedia.org/wiki/UTF-8) byte arrays. Orginally written for use in [buffer](https://github.com/feross/buffer) but factored out into a standalone module.

## Why
Mainly to make performance optimization easier and reduce the amount of code getting shipped to browsers. [utf8.js](https://github.com/mathiasbynens/utf8.js) exists, but the bytes it generates are returned to the caller as yet another JS string - this is fine but requires additional processing if you need your data as a [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays). [Text{En,De}coder](https://developer.mozilla.org/en-US/docs/Web/JavaScript/TextEncoder) APIs are also available but only in the browser and leave something to be desired in terms of performance.

## Install
``` shell
$ npm install utf8-transcoder
```

## Test
``` shell
$ npm run test
$ npm run test-browser
```
Warning: the tests are very basic at the moment - they only verify that encoding and decoding work for valid 1, 2, 3 and 4 byte code points. Patches welcome to cover things like replacement chars, errors, etc.

## Benchmark
``` shell
$ npm run bench
$ npm run bench-browser
encode
TextEncoder: 2.290s
Buffer: 1.552s
this module: 932.701ms
decode
TextDecoder: 9.256s
Buffer: 1.439s
this module: 414.048ms
```

## License
MIT

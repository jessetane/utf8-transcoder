# utf8-transcoder
Transcode JavaScript strings <> [UTF-8](http://en.wikipedia.org/wiki/UTF-8) byte arrays. Orginally written for use in [buffer](https://github.com/feross/buffer) but factored out into a standalone module.

## Why
Mainly to make performance optimization easier and reduce the amount of code getting shipped to browsers. [utf8.js](https://github.com/mathiasbynens/utf8.js) exists, but the bytes it generates are returned to the caller as yet another JS string - this is fine but requires additional processing if you need your data as a [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays). [Text{En,De}coder](https://developer.mozilla.org/en-US/docs/Web/JavaScript/TextEncoder) APIs are also available but leave something to be desired in terms of performance.

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

## Bench
On a chromebook, using node@14.6.0:
``` shell
$ npm run bench

> utf8-transcoder@2.0.1 bench utf8-transcoder
> node bench

encode
TextEncoder: 2.414s
Buffer: 1.334s
this module: 994.79ms
decode
TextDecoder: 8.975s
Buffer: 1.378s
this module: 418.36ms
```

## License
MIT

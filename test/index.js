var tape = require('tape')
var utf8js = require('utf8')
var utf8transcoder = require('../')
var isBrowser = typeof window !== 'undefined'

var string = 'aаࠀ😸' // 1,2,3 and 4 byte codepoints
var bytes = new Uint8Array(Buffer.from(string))

tape('encode', t => {
  t.plan(isBrowser ? 4 : 3)
  var encoded = {
    buffer: bytes,
    utf8js: new Uint8Array(utf8js.encode(string).split('').map(c => c.charCodeAt(0))),
    utf8transcoder: new Uint8Array(utf8transcoder.encode(string))
  }
  t.deepEqual(encoded.buffer, encoded.utf8js)
  t.deepEqual(encoded.buffer, encoded.utf8transcoder)
  if (isBrowser) {
    t.deepEqual(encoded.buffer, new TextEncoder().encode(string))
  }
})

tape('decode', t => {
  t.plan(isBrowser ? 4 : 3)
  var decoded = {
    buffer: Buffer.from(bytes).toString(),
    utf8js: utf8js.decode(String.fromCharCode.apply(String, bytes)),
    utf8transcoder: utf8transcoder.decode(bytes)
  }
  t.deepEqual(decoded.buffer, decoded.utf8js)
  t.deepEqual(decoded.buffer, decoded.utf8transcoder)
  if (isBrowser) {
    t.deepEqual(decoded.buffer, new TextDecoder().decode(bytes))
  }
})

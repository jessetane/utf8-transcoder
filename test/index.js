var tape = require('tape')
var utf8js = require('utf8')
var utf8transcoder = require('../')
var isBrowser = typeof window !== 'undefined'

var string = 'aаࠀ😸' // 1,2,3 and 4 byte codepoints
var bytes = new Uint8Array(Buffer.from(string))

tape('encode', t => {
  t.plan(isBrowser ? 3 : 2)
  t.deepEqual(bytes, new Uint8Array(utf8js.encode(string).split('').map(c => c.charCodeAt(0))))
  t.deepEqual(bytes, new Uint8Array(utf8transcoder.encode(string)))
  if (isBrowser) {
    t.deepEqual(bytes, new TextEncoder().encode(string))
  }
})

tape('decode', t => {
  t.plan(isBrowser ? 3 : 2)
  t.deepEqual(string, utf8js.decode(String.fromCharCode.apply(String, bytes)))
  t.deepEqual(string, utf8transcoder.decode(bytes))
  if (isBrowser) {
    t.deepEqual(string, new TextDecoder().decode(bytes))
  }
})

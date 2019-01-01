var utf8js = require('utf8')
var utf8transcoder = require('../')
var isBrowser = typeof window !== 'undefined'

var string = 'aаࠀ😸' // 1,2,3 and 4 byte codepoints
var bytes = new Uint8Array(Buffer.from(string))
var iterations = 0xfffff


console.log('encode')

console.time('Buffer')
for (var i = 0; i < iterations; i++) {
  var b = Buffer.from(string)
  new Uint8Array(b.buffer, 0, b.length)
}
console.timeEnd('Buffer')

console.time('utf8.js')
for (var i = 0; i < iterations; i++) {
  var s = utf8js.encode(string)
  var l = s.length
  var b = new Uint8Array(l)
  var n = 0
  while (n < l) b[n] = s[n++].charCodeAt(0)
}
console.timeEnd('utf8.js')

console.time('this module')
for (var i = 0; i < iterations; i++) new Uint8Array(utf8transcoder.encode(string))
console.timeEnd('this module')

if (isBrowser) {
  var textEncoder = new TextEncoder()
  console.time('TextEncoder')
  for (var i = 0; i < iterations; i++) textEncoder.encode(string)
  console.timeEnd('TextEncoder')
}


console.log('decode')

console.time('Buffer')
for (var i = 0; i < iterations; i++) Buffer.from(bytes).toString()
console.timeEnd('Buffer')

console.time('utf8.js')
for (var i = 0; i < iterations; i++) utf8js.decode(String.fromCharCode.apply(String, bytes))
console.timeEnd('utf8.js')

console.time('this module')
for (var i = 0; i < iterations; i++) utf8transcoder.decode(bytes)
console.timeEnd('this module')

if (isBrowser) {
  console.time('TextDecoder')
  var textDecoder = new TextDecoder()
  for (var i = 0; i < iterations; i++) textDecoder.decode(bytes)
  console.timeEnd('TextDecoder')
}
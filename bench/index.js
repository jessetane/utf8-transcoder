import utf8transcoder from './utf8-transcoder/index.js'

var isBrowser = typeof window !== 'undefined'
var string = 'aаࠀ😸' // 1,2,3 and 4 byte codepoints
var bytes = new Uint8Array(utf8transcoder.encode(string))
var iterations = 0xfffff

console.log('encode')
var textEncoder = new TextEncoder()
console.time('TextEncoder')
for (var i = 0; i < iterations; i++) textEncoder.encode(string)
console.timeEnd('TextEncoder')
if (!isBrowser) {
  console.time('Buffer')
  for (var i = 0; i < iterations; i++) {
    var b = Buffer.from(string)
    new Uint8Array(b.buffer, 0, b.length)
  }
  console.timeEnd('Buffer')
}
console.time('this module')
for (var i = 0; i < iterations; i++) new Uint8Array(utf8transcoder.encode(string))
console.timeEnd('this module')

console.log('decode')
console.time('TextDecoder')
var textDecoder = new TextDecoder()
for (var i = 0; i < iterations; i++) textDecoder.decode(bytes)
console.timeEnd('TextDecoder')
if (!isBrowser) {
  console.time('Buffer')
  for (var i = 0; i < iterations; i++) Buffer.from(bytes).toString()
  console.timeEnd('Buffer')
}
console.time('this module')
for (var i = 0; i < iterations; i++) utf8transcoder.decode(bytes)
console.timeEnd('this module')

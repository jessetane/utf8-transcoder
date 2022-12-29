import utf8 from 'utf8-transcoder'

var isBrowser = typeof window !== 'undefined'
var string = 'aаࠀ😸' // 1,2,3 and 4 byte codepoints
var bytes = utf8.encode(string)
var iterations = 0xfffff

console.log('encode')

console.time('this module')
for (var i = 0; i < iterations; i++) utf8.encode(string)
console.timeEnd('this module')

if (!isBrowser) {
  console.time('Buffer')
  for (var i = 0; i < iterations; i++) Buffer.from(string)
  console.timeEnd('Buffer')
}

var textEncoder = new TextEncoder()
console.time('TextEncoder')
for (var i = 0; i < iterations; i++) textEncoder.encode(string)
console.timeEnd('TextEncoder')

console.log('decode')

console.time('this module')
for (var i = 0; i < iterations; i++) utf8.decode(bytes)
console.timeEnd('this module')

if (!isBrowser) {
  console.time('Buffer')
  for (var i = 0; i < iterations; i++) Buffer.from(bytes).toString()
  console.timeEnd('Buffer')
}

console.time('TextDecoder')
var textDecoder = new TextDecoder()
for (var i = 0; i < iterations; i++) textDecoder.decode(bytes)
console.timeEnd('TextDecoder')

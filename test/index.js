import tap from 'tap-esm'
import utf8 from 'utf8-transcoder'

var isBrowser = typeof window !== 'undefined'
var string = 'aаࠀ😸' // 1,2,3 and 4 byte codepoints
var bytes = utf8.encode(string)

tap('encode', t => {
  t.plan(!isBrowser ? 2 : 1)
  if (!isBrowser) {
    t.arrayEqual(bytes, Buffer.from(string))
  }
  t.arrayEqual(bytes, new TextEncoder().encode(string))
})

tap('decode', t => {
  t.plan(!isBrowser ? 3 : 2)
  if (!isBrowser) {
    t.arrayEqual(string, Buffer.from(string).toString())
  }
  t.arrayEqual(string, new TextDecoder().decode(bytes))
  t.arrayEqual(string, utf8.decode(bytes))
})

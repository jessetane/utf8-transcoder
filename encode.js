export default function encode (string, bytes, returnArray) {
  bytes = bytes || []
  var codePoint, leadSurrogate = null
  var length = string.length
  var n = 0
  var i = -1
  while (++i < length) {
    // javascript => utf16
    codePoint = string.charCodeAt(i)
    // utf16 => unicode
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      if (!leadSurrogate) {
        if (codePoint > 0xDBFF) {
          bytes[n++] = 0xEF
          bytes[n++] = 0xBF
          bytes[n++] = 0xBD
          continue
        } else if (i + 1 === length) {
          bytes[n++] = 0xEF
          bytes[n++] = 0xBF
          bytes[n++] = 0xBD
          continue
        }
        leadSurrogate = codePoint
        continue
      }
      if (codePoint < 0xDC00) {
        bytes[n++] = 0xEF
        bytes[n++] = 0xBF
        bytes[n++] = 0xBD
        leadSurrogate = codePoint
        continue
      }
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      bytes[n++] = 0xEF
      bytes[n++] = 0xBF
      bytes[n++] = 0xBD
    }
    leadSurrogate = null
    // unicode => utf8
    if (codePoint < 0x80) {
      bytes[n++] = codePoint
    } else if (codePoint < 0x800) {
      bytes[n++] = codePoint >> 0x6 | 0xC0
      bytes[n++] = codePoint & 0x3F | 0x80
    } else if (codePoint < 0x10000) {
      bytes[n++] = codePoint >> 0xC | 0xE0
      bytes[n++] = codePoint >> 0x6 & 0x3F | 0x80
      bytes[n++] = codePoint & 0x3F | 0x80
    } else if (codePoint < 0x110000) {
      bytes[n++] = codePoint >> 0x12 | 0xF0
      bytes[n++] = codePoint >> 0xC & 0x3F | 0x80
      bytes[n++] = codePoint >> 0x6 & 0x3F | 0x80
      bytes[n++] = codePoint & 0x3F | 0x80
    } else {
      throw new Error('Invalid code point')
    }
  }
  if (returnArray) return bytes
  const u = new Uint8Array(bytes.length)
  u.set(bytes)
  return u
}

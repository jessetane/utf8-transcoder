export default function decode (bytes) {
  var string = ''
  var codePoints = []
  var codePoint, tempCodePoint, firstByte, secondByte, thirdByte, fourthByte, bytesPerSequence
  var length = bytes.length
  var i = 0
  while (i < length) {
    // utf8 => unicode
    codePoint = null
    firstByte = bytes[i]
    if (firstByte > 0xEF) {
      bytesPerSequence = 4
      secondByte = bytes[i + 1]
      thirdByte = bytes[i + 2]
      fourthByte = bytes[i + 3]
      if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
          codePoint = tempCodePoint
        }
      }
    } else if (firstByte > 0xDF) {
      bytesPerSequence = 3
      secondByte = bytes[i + 1]
      thirdByte = bytes[i + 2]
      if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
          codePoint = tempCodePoint
        }
      }
    } else if (firstByte > 0xBF) {
      bytesPerSequence = 2
      secondByte = bytes[i + 1]
      if ((secondByte & 0xC0) === 0x80) {
        tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
        if (tempCodePoint > 0x7F) {
          codePoint = tempCodePoint
        }
      }
    } else {
      bytesPerSequence = 1
      if (firstByte < 0x80) {
        codePoint = firstByte
      }
    }
    // unicode => utf16
    if (codePoint === null) {
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      codePoint -= 0x10000
      codePoints[codePoints.length] = codePoint >>> 10 & 0x3FF | 0xD800
      codePoint = 0xDC00 | codePoint & 0x3FF
    }
    codePoints[codePoints.length] = codePoint
    i += bytesPerSequence
  }
  // utf16 => javascript
  // use String.fromCharCode.apply for best performance
  // but decode in chunks to avoid "call stack size exceeded" error
  // based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args
  // we go an order of magnitude less for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000
  length = codePoints.length
  if (length <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints)
  }
  i = 0
  while (i < length) {
    string += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return string
}

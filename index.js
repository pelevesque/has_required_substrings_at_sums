'use strict'

const sumDigits = require('@pelevesque/sum-digits')

const isObjectEmpty = (obj) =>
  Object.entries(obj).length === 0 && obj.constructor === Object

module.exports = (str, requiredSubstrings,
  {
    substringsToDigits = null,
    sumPlainDigits = true,
    allowSubstringBleeding = false
  } = {}
) => {
  if (isObjectEmpty(requiredSubstrings)) return true
  if (!isObjectEmpty(requiredSubstrings) && str === '') return false
  for (let i = 0, len = str.length; i < len; i++) {
    const sum = sumDigits(str.substr(0, i + 1), {
      substringsToDigits: substringsToDigits,
      sumPlainDigits: sumPlainDigits
    })
    if (requiredSubstrings.hasOwnProperty(sum)) {
      let substring = requiredSubstrings[sum]
      if (allowSubstringBleeding) {
        const substringMaxLength = str.length - i - 1
        if (substring.length > substringMaxLength) {
          substring = substring.substr(0, substringMaxLength)
        }
      }
      const target = str.substr(i + 1, substring.length)
      if (substring.localeCompare(target) !== 0) {
        break
      } else {
        delete requiredSubstrings[sum]
      }
    }
  }
  return isObjectEmpty(requiredSubstrings)
}

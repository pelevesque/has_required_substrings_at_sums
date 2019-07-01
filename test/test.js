/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasRequiredSubstringsAtSums = require('../index')

describe('#hasRequiredSubstringsAtSums()', () => {
  describe('value check', () => {
    it('should return true when requiredSubstrings is an empty object', () => {
      const str = ''
      const requiredSubstrings = {}
      const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when str is empty, but requiredSubstrings is not empty', () => {
      const str = ''
      const requiredSubstrings = { 0: 'a' }
      const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })
  })

  describe('basic summing', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '123a45'
        const requiredSubstrings = { 1: 'a' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after the sum', () => {
        const str = '123za5'
        const requiredSubstrings = { 6: 'a' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '123a45'
        const requiredSubstrings = { 6: 'a' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are not found', () => {
        const str = '1a2b3c45'
        const requiredSubstrings = { 1: 'a', 3: 'b', 10: 'a' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1a2b3c45'
        const requiredSubstrings = { 1: 'a', 3: 'b', 6: 'c' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '123abc45'
        const requiredSubstrings = { 1: 'abc' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after the sum', () => {
        const str = '123zabc5'
        const requiredSubstrings = { 6: 'abc' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '123abc45'
        const requiredSubstrings = { 6: 'abc' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are not found', () => {
        const str = '1abc2bcd3cde45'
        const requiredSubstrings = { 1: 'abc', 3: 'bcd', 10: 'a' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1abc2bcd3cde45'
        const requiredSubstrings = { 1: 'abc', 3: 'bcd', 6: 'cde' }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowSubstringBleeding flag', () => {
      it('should not allow bleeding when set to false', () => {
        const str = '123ma'
        const requiredSubstrings = { 6: 'man' }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = '123ma'
        const requiredSubstrings = { 6: 'man' }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })

  describe('substringsToDigits summing', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!a'
        const requiredSubstrings = { 1: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after the sum', () => {
        const str = '123!za5'
        const requiredSubstrings = { 10: 'a' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!a'
        const requiredSubstrings = { 3: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are not found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 5: 'a', 12: 'b', 1: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 5: 'a', 12: 'b', 21: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 1: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after the sum', () => {
        const str = '123!zabc5'
        const requiredSubstrings = { 10: 'abc' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 3: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are not found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 5: 'abc', 12: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 5: 'abc', 12: 'bcd', 21: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substringsToDigits', () => {
      it('should return false when some of many substrings are not found', () => {
        const str = '1!!!abc2!!!@bcd3###@cde'
        const requiredSubstrings = { 5: 'abc', 16: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!!!': 4, '@': 5, '###': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!!!abc2!!!@bcd3###@cde'
        const requiredSubstrings = { 5: 'abc', 16: 'bcd', 30: 'cde' }
        const substringsToDigits = { '!!!': 4, '@': 5, '###': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowSubstringBleeding flag', () => {
      it('should not allow bleeding when set to false', () => {
        const str = '123!ma'
        const requiredSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = '123!ma'
        const requiredSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })

  describe('sumPlainDigits', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!a'
        const requiredSubstrings = { 3: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after the sum', () => {
        const str = '123!za5'
        const requiredSubstrings = { 4: 'a' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!a'
        const requiredSubstrings = { 2: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are not found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 4: 'a', 9: 'b', 1: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 4: 'a', 9: 'b', 15: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 3: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after the sum', () => {
        const str = '123!zabc5'
        const requiredSubstrings = { 4: 'abc' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 2: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are not found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 4: 'abc', 9: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 4: 'abc', 9: 'bcd', 15: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowSubstringBleeding flag', () => {
      it('should not allow bleeding when set to false', () => {
        const str = '123!ma'
        const requiredSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = '123!ma'
        const requiredSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAtSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })
})

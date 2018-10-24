import { getInitial } from '../'

describe('Helper functions', () => {
  describe('getInitial function', () => {
    test('Name with uppercase initial', () => {
      const result = getInitial('Peter Quill')
      expect(result).toBe('P')
    })

    test('Name with lowercase initial', () => {
      const result = getInitial('peter quill')
      expect(result).toBe('P')
    })

    test('No name', () => {
      const result = getInitial('')
      expect(result).toBe('?')
    })
  })
})

import { validateEmail } from '../validation'

describe('Validation helpers', () => {
  test('validateEmail', () => {
    const email = 'test99@seenit.io'
    const result = validateEmail(email)

    expect(result).toBe(true)
  })
})

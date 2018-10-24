import { mapStateToProps } from '../'

describe('Login page container', () => {
  test('mapStateToProps', () => {
    const state = { user: { isLoggedIn: true } }
    const output = mapStateToProps(state)
    const expectedOutput = { isLoggedIn: true }
    expect(output).toEqual(expectedOutput)
  })
})

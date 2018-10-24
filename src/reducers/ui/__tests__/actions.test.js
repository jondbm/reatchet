import types from '../types'
import * as actions from '../actions'

describe('UI redux actions', () => {
  test('showLoader', () => {
    const expectedOutput = { type: types.SHOW_LOADER }
    const output = actions.showLoader()
    expect(output).toEqual(expectedOutput)
  })

  test('hideLoader', () => {
    const expectedOutput = { type: types.HIDE_LOADER }
    const output = actions.hideLoader()
    expect(output).toEqual(expectedOutput)
  })

  test('setViewWidth', () => {
    const expectedOutput = {
      type: types.SET_VIEW_WIDTH,
      payload: { width: 619 }
    }
    const output = actions.setViewWidth(619)
    expect(output).toEqual(expectedOutput)
  })
})

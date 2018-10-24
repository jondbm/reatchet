import reducer from '../'
import types from '../types'
import initialState from '../initialState'

describe('UI redux reducer', () => {
  const state = { ...initialState }

  const reduce = action => {
    return reducer(state, action)
  }

  test(types.SHOW_LOADER, () => {
    const output = reduce({ type: types.SHOW_LOADER })
    const expectedOutput = {
      ...state,
      isLoading: true
    }
    expect(output).toEqual(expectedOutput)
  })

  test(types.HIDE_LOADER, () => {
    const output = reduce({ type: types.HIDE_LOADER })
    const expectedOutput = {
      ...state,
      isLoading: false
    }
    expect(output).toEqual(expectedOutput)
  })

  test(types.SET_VIEW_WIDTH, () => {
    const output = reduce({
      type: types.SET_VIEW_WIDTH,
      payload: { width: 619 }
    })
    const expectedOutput = {
      ...state,
      viewWidth: 619
    }
    expect(output).toEqual(expectedOutput)
  })

  test('default case', () => {
    const output = reduce({})
    const expectedOutput = { ...state }
    expect(output).toEqual(expectedOutput)
  })
})

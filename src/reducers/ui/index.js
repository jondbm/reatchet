import types from './types'
import initialState from './initialState'

const reducer = (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case types.SHOW_LOADER:
      return { ...state, isLoading: true }

    case types.HIDE_LOADER:
      return { ...state, isLoading: false }

    case types.SET_VIEW_WIDTH:
      return { ...state, viewWidth: payload.width }

    default:
      return state
  }
}

export default reducer

import types from './types'

const initialState = {
  isLoggedIn: false,
  hasInvalidCredentials: false
}

const reducer = (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case types.SET_USER: {
      return {
        ...state,
        ...payload.user,
        isLoggedIn: true
      }
    }

    case types.SET_USER_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: true,
        hasInvalidCredentials: false
      }
    }

    case types.LOG_OUT: {
      return {
        ...initialState
      }
    }

    case types.SET_INVALID_CREDENTIALS: {
      return {
        ...initialState,
        hasInvalidCredentials: true
      }
    }

    default:
      return state
  }
}

export default reducer

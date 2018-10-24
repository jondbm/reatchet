import { types } from './actions'

const initialState = {
  displayModal: false
}

const reducer = (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case types.OPEN_MODAL: {
      return {
        ...state,
        displayModal: true
      }
    }

    case types.CLOSE_MODAL: {
      return {
        ...state,
        displayModal: false
      }
    }

    default: {
      return state
    }
  }
}

export default reducer

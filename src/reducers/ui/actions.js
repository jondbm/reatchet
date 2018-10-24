import types from './types'

export const showLoader = () => ({ type: types.SHOW_LOADER })

export const hideLoader = () => ({ type: types.HIDE_LOADER })

export const setViewWidth = width => ({
  type: types.SET_VIEW_WIDTH,
  payload: { width }
})

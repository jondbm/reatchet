import types from './types'

export const logIn = (username, password) => ({
  type: types.LOG_IN,
  payload: { username, password }
})

export const setUser = user => ({
  type: types.SET_USER,
  payload: { user }
})

export const logOut = user => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('user')

  return {
    type: types.LOG_OUT
  }
}

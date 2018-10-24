import { put, takeLatest, call } from 'redux-saga/effects'
import userTypes from './types'
import * as custom_api from '../../api/user'
import axiosInstance from '../../api'

const api = custom_api

/*
*********
SELECTORS
*********
*/

/*
*********
WORKERS
*********
*/

export function* logIn(action) {
  const { username, password } = action.payload
  try {
    const response = yield call(api.logIn, username, password)
    const { access_token, refresh_token, ...rest } = response.data

    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('refreshToken', refresh_token)
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('user', JSON.stringify(rest))

    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${access_token}`

    yield put({ type: userTypes.SET_USER, payload: { user: rest } })
  } catch (err) {
    yield put({ type: userTypes.SET_INVALID_CREDENTIALS })
  }
}

export function* refreshSession() {
  try {
    const response = yield call(api.refreshSession)
    const { access_token } = response.data

    window.localStorage.setItem('accessToken', access_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

    yield put({ type: userTypes.SET_USER_LOGGED_IN })
  } catch (err) {
    throw new Error(err)
  }
}

/*
********
WATCHERS
********
*/

export default [takeLatest(userTypes.LOG_IN, logIn)]

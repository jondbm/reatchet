import axios from 'axios'

import api from '../'

const baseUrl = process.env.REACT_APP_API_ENDPOINT_AUTH

export const logIn = (username, password) => {
  return axios.post(`${baseUrl}/login/`, { username, password })
}

export const refreshSession = () => {
  const refreshToken = window.localStorage.getItem('refreshToken')
  const refreshHeaders = {
    headers: { Authorization: `Bearer ${refreshToken}` }
  }
  return api.post(`${baseUrl}/refresh/`, null, refreshHeaders)
}

/**
 * HERE WE CREATE A CUSTOM INSTANCE OF AXIOS WHICH WE CAN USE TO MAKE ALL OUR API CALLS.
 * IT'S IMPORTANT TO MAKE A CUSTOM INSTANCE HERE SO WE CAN ADD THE RESPONSE INTERCEPTOR TO
 * REFRESH THE ACCESS TOKEN IF NEEDED AND SET A BASE URL, BUT WITHOUT CONFLICTING WITH ANY
 * INSTANCES OF AXIOS THAT 3RD PARTY LIBRARIES MIGHT BE USING. UNLIKELY SCENARIO, BUT BETTER
 * TO BE CAUTIOUS
 */

import axios from 'axios'

import { store } from '../store'
import userTypes from '../reducers/user/types'

const api = axios.create()

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const originalRequest = error.config

    // Figre out whether the failed API call was the auth/refresh/ endpoint,
    // so we log the user out. If we didn't do this first, we'd get stuck in
    // an infinite loop of attempts to refresh the access token using an
    // expired refresh token

    const { url } = originalRequest
    const urlArray = url.split('/').filter(part => !!part)
    const endpoint = urlArray.pop()

    if (error.response.status === 401 && endpoint === 'refresh') {
      localStorage.clear()
      store.dispatch({ type: userTypes.LOG_OUT })
      return
    }

    // If the endpoint does not end in /refresh, we know it must be the access token that has expired,
    // so we can safely request a refresh for it, and then retry the API call that returned a 401 in
    // the first place

    if (error.response.status === 401) {
      // Get the refresh token from localStorage and add it as an auth header in a request to
      // the token refresh endpoint. This should return a new access token
      const refreshToken = window.localStorage.getItem('refreshToken')
      const refreshHeaders = {
        headers: { Authorization: `Bearer ${refreshToken}` }
      }
      return api
        .post(`auth/refresh/`, null, refreshHeaders)
        .then(({ data }) => {
          // Update localStorage to hold the new accessToken. This will be needed if/when the user refreshes the page
          window.localStorage.setItem('accessToken', data.access_token)

          // Set our axios instance to use the new access token in it's auth header in future API calls
          api.defaults.headers.common['Authorization'] = `Bearer ${
            data.access_token
          }`

          // Update the original request which returned the 401 in the first place, so we can try it again
          // with a shiny new access token
          originalRequest.headers['Authorization'] = `Bearer ${
            data.access_token
          }`
          return api(originalRequest)
        })
    }
  }
)

export default api

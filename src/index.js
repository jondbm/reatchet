/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './components/App'
import './reset.css'
import './style.css'
import 'typeface-roboto';


// const pathname = window.location.pathname
// const search = window.location.search
// let currentLocation = ''

// if (pathname) {
//   currentLocation = pathname
// }

// if (search) {
//   currentLocation = `${currentLocation}?${search}`
// }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import App from './'
import Login from '../Login'

export class Gatekeeper extends Component {
  // We pass the current location through with the redirect so users are
  // taken back to the page they originally visited once they've logged in
  getCurrentLocation = () => {
    const { location } = this.props
    return location.pathname + location.search
  }

  getRedirectState = () => {
    return {
      referrer: this.getCurrentLocation()
    }
  }

  render() {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() =>
            isLoggedIn ? (
              <App />
            ) : (
              <Redirect
                to={{ pathname: '/login', state: this.getRedirectState() }}
              />
            )
          }
        />
      </Switch>
    )
  }
}

export default withRouter(Gatekeeper)

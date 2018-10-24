import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import debounce from 'lodash.debounce'

import Dashboard from '../Dashboard'
import theme from '../../theme'

/*
*****************
STYLED COMPONENTS
*****************
*/

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  font-family: Lato, sans-serif;
`

const Main = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
  background-color: ${theme.colours.white};
`

/*
*********
COMPONENT
*********
*/

class App extends Component {
  static propTypes = {
    isLoading: bool,
    setViewWidth: func
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.props.setUser(user)
    }

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = debounce(() => {
    this.props.setViewWidth(window.innerWidth)
  }, 250)

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
    // If there's no user session in localStorage, go to /login to authenticate
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!isLoggedIn) {
      return (
        <Redirect to={{ pathname: '/login', state: this.getRedirectState() }} />
      )
    }

    // If we've just been redirected here from /login after successful auth,
    // redirect the user to the url they were originally on before being forced to auth
    const { location } = this.props
    if (location && location.state && location.state.referrer) {
      return <Redirect to={location.state.referrer} />
    }

    return (
      <StyledApp>
        <div id="modal-portal" />
        <Main>
          <Switch>
            <Route path='/' component={Dashboard}></Route>
          </Switch>
        </Main>
      </StyledApp>
    )
  }
}

export default App

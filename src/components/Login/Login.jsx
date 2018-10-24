import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import backgroundImage from '../../assets/login-background.jpg'
import LoginBox from './LoginBox'
import StandardLogin from './StandardLogin'
import ForgottenPassword from './ForgottenPassword'
import ForgottenPasswordSent from './ForgottenPasswordSent'

/*
*****************
STYLED COMPONENTS
*****************
*/

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-image: url(${backgroundImage});
  background-size: cover;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`

/*
*********
COMPONENT
*********
*/

class Login extends Component {
  render() {
    if (this.props.isLoggedIn) {
      let destination = '/'
      if (this.props.location.state && this.props.location.state.referrer) {
        destination = this.props.location.state.referrer
      }
      return <Redirect data-el="redirect-home" to={destination} />
    }

    return (
      <Wrapper data-el="login-page">
        <Background />
        <Content>
          <LoginBox>
            <Switch>
              <Route
                path="/login/forgotten-password/sent"
                component={ForgottenPasswordSent}
              />
              <Route
                path="/login/forgotten-password"
                component={ForgottenPassword}
              />
              <Route path="/login" component={StandardLogin} />
            </Switch>
          </LoginBox>
        </Content>
      </Wrapper>
    )
  }
}

export default Login

import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import TextInput from '../../common/TextInput'
import Button from '../../common/Buttons/Button'
import { Wrapper, Subtitle, StyledRecaptcha } from '../sharedComponents'

import { validateEmail } from '../../../helpers/validation'
import theme from '../../../theme'

/*
*****************
STYLED COMPONENTS
*****************
*/

const Error = styled.span`
  color: ${theme.colours.redDark};
  text-align: left;
  align-self: flex-start;
  margin-bottom: 12px;
  font-size: 12px;
`

const LoginButton = styled(Button)`
  margin-top: ${theme.spacing.sm};
  align-self: stretch;
`

const ForgottenPasswordLink = styled(Link)`
  font-size: 12px;
  color: ${theme.colours.teal};
  text-align: center;
  align-self: center;
  margin-top: ${theme.spacing.xs};
  text-decoration: none;
`

/*
*********
COMPONENT
*********
*/

class StandardLogin extends Component {
  state = {
    email: '',
    password: '',
    validation: {
      email: false,
      password: false
    },
    recaptchaToken: ''
  }

  updateEmail = value => {
    const isValid = validateEmail(value)

    this.setState({
      email: value,
      validation: {
        ...this.state.validation,
        email: isValid
      }
    })
  }

  updatePassword = value => {
    const isValid = value.length >= 8

    this.setState({
      password: value,
      validation: {
        ...this.state.validation,
        password: isValid
      }
    })
  }

  handleRecaptcha = token => {
    this.setState({ recaptchaToken: token })
  }

  handleExpiredRecaptcha = () => {
    this.setState({ recaptchaToken: '' })
  }

  logIn = () => {
    const { email, password } = this.state
    this.props.logIn(email, password)
  }

  // TODO: re-enable production check for recaptcha value once k8 is setup to handle it
  isButtonEnabled = () => {
    // if (process.env.REACT_APP_SEENIT_ENV === 'production') {
    //   return (
    //     this.state.recaptchaToken &&
    //     Object.values(this.state.validation).every(value => !!value)
    //   )
    // }
    return Object.values(this.state.validation).every(value => !!value)
  }

  render() {
    const buttonIsDisabled = !this.isButtonEnabled()

    return (
      <Wrapper>
        <Subtitle>
          Log in to Seenit Studio with your email address and password
        </Subtitle>
        <TextInput
          label="Email address"
          handleChange={this.updateEmail}
          value={this.state.email}
          isValid={this.state.validation.email}
          validationMessage="Enter a valid email address"
          data-key="input-email"
        />

        <TextInput
          label="Password"
          isPasswordInput
          handleChange={this.updatePassword}
          value={this.state.password}
          isValid={this.state.validation.password}
          validationMessage="Passwords must be at least 8 characters long"
          data-key="input-password"
        />

        {this.props.hasInvalidCredentials && (
          <Error data-el="credentials-error">
            Oops! Invalid email address or password. Please try again.
          </Error>
        )}

        <StyledRecaptcha
          handleRecaptcha={this.handleRecaptcha}
          handleExpiredRecaptcha={this.handleExpiredRecaptcha}
          id="login"
        />
        <LoginButton
          data-el="login-button"
          variant="raised"
          onClick={this.logIn}
          disabled={buttonIsDisabled}
        >
          Log in
        </LoginButton>
        <ForgottenPasswordLink
          to="/login/forgotten-password"
          data-el="forgotten-password-link"
        >
          Forgotten your password?
        </ForgottenPasswordLink>
      </Wrapper>
    )
  }
}

export default StandardLogin

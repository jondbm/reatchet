import React, { Component } from 'react'
import styled from 'styled-components'

import TextInput from '../../common/TextInput'
import Button from '../../common/Buttons/Button'
import { Wrapper, Title, Subtitle, StyledRecaptcha } from '../sharedComponents'

import { validateEmail } from '../../../helpers/validation'
import theme from '../../../theme'

/*
*****************
STYLED COMPONENTS
*****************
*/

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: stretch;
  margin-top: ${theme.spacing.sm};
`

const SubmitButton = styled(Button)`
  margin-left: ${theme.spacing.xs};
`

/*
*********
COMPONENT
*********
*/

class ForgottenPassword extends Component {
  state = {
    email: '',
    emailIsValid: true,
    recaptchaToken: ''
  }

  updateEmail = value => {
    const isValid = validateEmail(value)

    this.setState({
      email: value,
      emailIsValid: isValid
    })
  }

  handleRecaptcha = token => {
    this.setState({ recaptchaToken: token })
  }

  handleExpiredRecaptcha = () => {
    this.setState({ recaptchaToken: '' })
  }

  // can't seem to spy on history.goBack()
  /* istanbul ignore next */
  handleCancel = () => {
    this.props.history.goBack()
  }

  render() {
    const { email, emailIsValid } = this.state
    return (
      <Wrapper>
        <Title>Forgotten your password?</Title>
        <Subtitle>
          Pop your email address in below and in return we’ll send you a
          password reset link!
        </Subtitle>
        <TextInput
          label="Email address"
          handleChange={this.updateEmail}
          value={email}
          isValid={emailIsValid}
          validationMessage="Enter a valid email address"
        />
        <StyledRecaptcha
          handleRecaptcha={this.handleRecaptcha}
          handleExpiredRecaptcha={this.handleExpiredRecaptcha}
          id="forgotten-password"
        />
        <Footer>
          <Button
            data-el="cancel-button"
            variant="secondary"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
          <SubmitButton data-el="submit-button">Submit</SubmitButton>
        </Footer>
      </Wrapper>
    )
  }
}

export default ForgottenPassword

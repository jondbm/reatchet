import React from 'react'
import styled from 'styled-components'

import Button from '../../common/Buttons/Button'
import LinkButton from '../../common/Buttons/LinkButton'
import { Wrapper, Title, Subtitle } from '../sharedComponents'
import EnvelopeImage from '../../../assets/EnvelopeImage'

import theme from '../../../theme'

/*
*****************
STYLED COMPONENTS
*****************
*/

const Image = styled(EnvelopeImage)`
  width: 70%;
  margin-bottom: ${theme.spacing.sm};
`

const EmailLink = styled.a`
  text-decoration: none;
  color: ${theme.colours.teal};
`

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

const ForgottenPasswordSent = () => {
  return (
    <Wrapper>
      <Title>Check your mail!</Title>
      <Image />
      <Subtitle>
        We have sent you an activation email with instructions to set up your account. Don't forget
        to check your spam folder and contact{' '}
        <EmailLink href="mailto:support@seenit.io">support@seenit.io</EmailLink> if you have any
        trouble!
      </Subtitle>
      <Footer>
        <LinkButton to="/login" data-el="cancel-button" variant="secondary" onClick={() => {}}>
          Back
        </LinkButton>
        <SubmitButton data-el="submit-button">Resend</SubmitButton>
      </Footer>
    </Wrapper>
  )
}

export default ForgottenPasswordSent

import React from 'react'
import 'jest-styled-components'

import { shallow } from 'enzyme'

import StandardLogin from '../StandardLogin'

describe('<StandardLogin /> component', () => {
  const initialState = {
    email: '',
    password: '',
    validation: {
      email: false,
      password: false
    },
    recaptchaToken: ''
  }

  let component
  const logIn = jest.fn()

  const props = {
    logIn
  }

  beforeEach(() => {
    component = shallow(<StandardLogin {...props} />)
  })

  describe('basic rendering', () => {
    it('should correctly render the component', () => {
      expect(component.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe('component methods', () => {
    test('updateEmail', () => {
      const email = 'test@test.com'
      const expectedValidationState = {
        ...initialState.validation,
        email: true
      }

      const updateEmail = component.instance().updateEmail
      updateEmail(email)
      component.update()
      expect(component.state('email')).toEqual(email)
      expect(component.state('validation')).toEqual(expectedValidationState)
    })

    test('updatePassword', () => {
      const password = 'paswword123'
      const expectedValidationState = {
        ...initialState.validation,
        password: true
      }

      const updatePassword = component.instance().updatePassword
      updatePassword(password)
      component.update()
      expect(component.state('password')).toEqual(password)
      expect(component.state('validation')).toEqual(expectedValidationState)
    })

    test('handleRecaptcha', () => {
      const handleRecaptcha = component.instance().handleRecaptcha
      handleRecaptcha('123456')
      component.update()
      expect(component.state('recaptchaToken')).toEqual('123456')
    })

    test('handleExpiredRecaptcha', () => {
      const handleExpiredRecaptcha = component.instance().handleExpiredRecaptcha
      handleExpiredRecaptcha()
      component.update()
      expect(component.state('recaptchaToken')).toEqual('')
    })

    test('logIn', () => {
      const instanceLogIn = component.instance().logIn
      const email = 'test@test.com'
      const password = 'password123'
      component.setState({ email, password })
      component.update()
      instanceLogIn()
      component.update()
      expect(logIn).toHaveBeenCalledWith(email, password)
    })
  })
})

import React from 'react'
import 'jest-styled-components'
import createMemoryHistory from 'history/createMemoryHistory'
import { shallow } from 'enzyme'

import ForgottenPassword from '../'

describe('<ForgottenPassword /> component', () => {
  let component

  const memoryHistory = createMemoryHistory({
    initialEntries: ['/login', '/login/forgotten-password'],
    initialIndex: 0,
    keyLength: 2,
    getUserConfirmation: null
  })

  beforeEach(() => {
    component = shallow(<ForgottenPassword history={memoryHistory} />)
  })

  describe('basic rendering', () => {
    it('should correctly render the component', () => {
      expect(component.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe('updateEmail()', () => {
    let updateEmail
    beforeEach(() => {
      updateEmail = component.instance().updateEmail
    })

    it('should set the correct email address in state', () => {
      updateEmail('test@test.com')
      component.update()
      expect(component.state('email')).toBe('test@test.com')
    })

    it('should set state emailIsValid when it is valid', () => {
      updateEmail('test@test.com')
      component.update()
      expect(component.state('emailIsValid')).toBe(true)
    })

    it('should set state !emailIsValid when it is invalid', () => {
      updateEmail('test@test')
      component.update()
      expect(component.state('emailIsValid')).toBe(false)
    })
  })

  describe('handleRecaptcha()', () => {
    it('should set the recaptcha token in state', () => {
      const handleRecaptcha = component.instance().handleRecaptcha
      handleRecaptcha('token123')
      component.update()
      expect(component.state('recaptchaToken')).toBe('token123')
    })
  })

  describe('handleExpiredRecaptcha()', () => {
    it('should remove the recaptcha token from state', () => {
      const handleExpiredRecaptcha = component.instance().handleExpiredRecaptcha
      handleExpiredRecaptcha()
      component.update()
      expect(component.state('recaptchaToken')).toBe('')
    })
  })
})

import React from 'react'
import 'jest-styled-components'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'

import Login from '../Login'

describe('<Login /> component', () => {
  describe('!isLoggedIn', () => {
    let component

    beforeEach(() => {
      component = mount(
        <MemoryRouter keyLength={0}>
          <Login isLoggedIn={false} />
        </MemoryRouter>
      )
    })

    it('should render the login page when not logged in', () => {
      const page = component.find('[data-el="login-page"]')
      expect(page.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe('isLoggedIn redirect', () => {
    it('should redirect once logged in', () => {
      const component = mount(
        <MemoryRouter keyLength={0}>
          <Login isLoggedIn location={{ state: { referrer: '/test' } }} />
        </MemoryRouter>
      )
      const redirect = component.find('[data-el="redirect-home"]')
      expect(redirect.exists()).toBe(true)
    })

    it('should redirect to referrer destination when one is set', () => {
      const component = mount(
        <MemoryRouter keyLength={0}>
          <Login isLoggedIn location={{ state: { referrer: '/test' } }} />
        </MemoryRouter>
      )
      const redirect = component.find('[data-el="redirect-home"]')
      expect(redirect.prop('to')).toEqual('/test')
    })

    it('should redirect to "/" when no referrer is set', () => {
      const component = mount(
        <MemoryRouter keyLength={0}>
          <Login isLoggedIn location={{}} />
        </MemoryRouter>
      )

      const redirect = component.find('[data-el="redirect-home"]')
      expect(redirect.prop('to')).toEqual('/')
    })
  })
})

import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'

import { Wrapper, Title, Subtitle, StyledRecaptcha } from '../sharedComponents'

describe('Shared components', () => {
  describe('<Wrapper /> component', () => {
    let component

    beforeEach(() => {
      component = shallow(<Wrapper />)
    })

    it('should correctly render the component', () => {
      expect(component.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe('<Title /> component', () => {
    let component

    beforeEach(() => {
      component = shallow(<Title />)
    })

    it('should correctly render the component', () => {
      expect(component.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe('<Subtitle /> component', () => {
    let component

    beforeEach(() => {
      component = shallow(<Subtitle />)
    })

    it('should correctly render the component', () => {
      expect(component.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe('<StyledRecaptcha /> component', () => {
    let component

    beforeEach(() => {
      component = shallow(<StyledRecaptcha />)
    })

    it('should correctly render the component', () => {
      expect(component.exists()).toBe(true)
    })

    it('should match the snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})

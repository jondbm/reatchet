import React from 'react'
import 'jest-styled-components'

import { shallow } from 'enzyme'

import EnvelopeImage from '../EnvelopeImage'

describe('<EnvelopeImage /> component', () => {
  let component

  beforeEach(() => {
    component = shallow(<EnvelopeImage />)
  })

  it('should correctly render the component', () => {
    expect(component.exists()).toBe(true)
  })

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow } from 'enzyme'

import Logo from '../Logo'

describe('<Logo /> component', () => {
  let component
  beforeEach(() => {
    component = shallow(<Logo />)
  })

  it('should render the component', () => {
    expect(component.exists()).toEqual(true)
  })

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})

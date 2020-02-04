import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import NavBar from '../NavBar'

describe(`<NavBar />`, () => {
  it(`+++ renderer component`, () => {
    const wrapper = shallow(<NavBar />)
    return expect(toJson(wrapper)).toMatchSnapshot()
  })
})
import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import Preloader from '../Preloader'

describe(`Testing the Preloader component`, () => {
  it(`+++ renderer component`, () => {
    const wrapper = shallow(<Preloader />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
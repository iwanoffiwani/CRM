import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Preloader from '../Preloader'

describe(`<Preloader />`, () => {
  it(`+++ renderer component`, () => {
    const wrapper = shallow(<Preloader />)
    return expect(toJson(wrapper)).toMatchSnapshot()
  })
})
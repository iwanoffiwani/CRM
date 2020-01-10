import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from '../NavBar'

describe(`Testing the Navbar component`, () => {
  it(`+++ renderer component`, () => {
    const wrapper = shallow(
      <Router>
        <NavBar />
      </Router>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
}) 
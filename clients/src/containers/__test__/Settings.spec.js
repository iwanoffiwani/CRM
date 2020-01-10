import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Settings from '../Settings'

describe(`Testing the Settings component`, () => {
  it(`+++ renderer component`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Settings />
        </Router>
      </Provider>
    )
    let tree = toJson(wrapper)

    return expect(tree).toMatchSnapshot()
  })
})
import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

import { Layout } from '../Layout'

describe(`Testing the Layout component`, () => {
  it(`+++ renderer component`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
}) 
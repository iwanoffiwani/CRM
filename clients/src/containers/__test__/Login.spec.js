import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Login } from '../Login'

describe('Testing the Login component', () => {
  it('+++ renderer component without props', () => {
    const wrapper = shallow(<Login />)
    let tree = toJson(wrapper)

    return expect(tree).toMatchSnapshot()
  })

  it('+++ renderer component with error message', () => {
    const nextProps = {
      error: true,
      message: 'Some text for error message'
    }

    const wrapper = shallow(<Login {...nextProps} />)
    const tree = toJson(wrapper)

    expect(tree).toMatchSnapshot()
  })
})
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { SearchBar } from '../SearchBar'

describe('Testing the SearchBar component', () => {
  it('+++ renderer component', () => {
    const wrapper = shallow(<SearchBar />)
    let tree = toJson(wrapper)
  
    return expect(tree).toMatchSnapshot()
  })
})
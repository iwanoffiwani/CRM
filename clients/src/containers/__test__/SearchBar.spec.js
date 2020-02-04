import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { SearchBar } from '../SearchBar'
import InputBase from '@material-ui/core/InputBase'

describe('Tests SearchBar component', () => {
  const props = {
    orders: [
      {
        name: 'Новая заявка-31'
      },
      {
        name: 'Новая заявка-21',
      },
    ],
    result: jest.fn()
  }
  
  it('+++ renderer component', () => {
    const wrapper = shallow(<SearchBar {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ simulate of changing inputs value', () => {
    const wrapper = shallow(<SearchBar {...props} />)

    expect(wrapper.find(InputBase).at(0).props().value).toBe('')
    
    wrapper.find(InputBase).at(0).simulate('change', { target: { value: props.orders[props.orders.length-1].name } })
    
    expect(wrapper.find(InputBase).at(0).props().value).toBe(props.orders[props.orders.length-1].name)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
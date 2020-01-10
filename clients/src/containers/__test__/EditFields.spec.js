import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { EditFields } from '../EditFields'

describe(`Testing the EditFields component`, () => {
  const props = {
    fields: [
      {
        "value": "",
        "_id": "5dcac8a093dd3b05f8cb0adc",
        "name": "Мобильный телефон",
        "__v": 0
      },
      {
        "value": "",
        "_id": "5df9f19e1607be20381256e8",
        "name": "Номер паспорта",
        "__v": 0
      },
      {
        "value": "",
        "_id": "5dfa29e98ef6f51a186c395e",
        "name": "Домашний телефон",
        "__v": 0
      },
      {
        "value": "",
        "_id": "5e00b1bfa63229263405fd21",
        "name": "Паспорт",
        "__v": 0
      }
    ],
    ordersListUpdate: jest.fn(),
    fieldsUpdate: jest.fn()
  }
  
  const wrapper = mount(<EditFields {...props} />)
  const tree = toJson(wrapper)

  it(`+++renderer component`, () => {
    expect(tree).toMatchSnapshot()
  })
})
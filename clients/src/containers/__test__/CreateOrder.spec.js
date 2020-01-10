import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

// import renderer from 'react-test-renderer'

import { CreateOrder } from '../CreateOrder'

describe(`Testing CreateOrder component`, () => {
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
      }
    ],
    statuses: [
      {
        "_id": "5df25a863c1abb1cec5b2855",
        "name": "Статус-2",
        "color": "#F47373",
        "__v": 0
      },
      {
        "_id": "5df25a8a3c1abb1cec5b2856",
        "name": "Статус-3",
        "color": "#F47373",
        "__v": 0
      },
      {
        "_id": "5df25a8d3c1abb1cec5b2857",
        "name": "Статус-4",
        "color": "#F47373",
        "__v": 0
      }
    ]
  }

  it(`+++ renderer CreateOrder component with props`, () => {
    const wrapper = shallow(<CreateOrder {...props} />)
    const tree = toJson(wrapper)

    return expect(tree).toMatchSnapshot()
  })
})
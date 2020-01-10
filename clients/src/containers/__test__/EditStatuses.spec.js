import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { EditStatuses } from '../EditStatuses'

describe(`Testing the EditStatuses component`, () => {
  const props = {
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
      },
      {
        "_id": "5e00bab2e61c501fa073a988",
        "name": "Статус-5",
        "__v": 0
      }
    ],
    ordersListUpdate: jest.fn(),
    statusesUpdate: jest.fn()
  }
  
  const wrapper = mount(<EditStatuses {...props} />)
  const tree = toJson(wrapper)

  it(`+++renderer component`, () => {
    expect(tree).toMatchSnapshot()
  })
})
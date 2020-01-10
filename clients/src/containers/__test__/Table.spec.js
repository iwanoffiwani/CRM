import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux'
import { store } from '../../redux/store/'
import { BrowserRouter as Router } from 'react-router-dom'

import { TableOrders } from '../Table'

describe(`Testing the Table component`, () => {
  const props = {
    columns: [
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
    rows: [
      {
        "_id": "5dfa49d00f1a4b206031d579",
        "name": "новая заявка-3",
        "user": "5da47a1353265a14c80ef289",
        "fields": [
          {
            "value": "+7 999 666 55 55",
            "_id": "5dcac8a093dd3b05f8cb0adc",
            "name": "Мобильный телефон"
          },
          {
            "value": "46 69 6546842",
            "_id": "5df9f19e1607be20381256e8",
            "name": "Номер паспорта"
          },
          {
            "value": "666 69 69",
            "_id": "5dfa29e98ef6f51a186c395e",
            "name": "Домашний телефон"
          },
          {
            "value": "",
            "_id": "5e00b1bfa63229263405fd21",
            "name": "Паспорт"
          }
        ],
        "status": {
          "name": "Статус-1",
          "color": "#F47373"
        },
        "comments": [],
        "changes": [],
        "data": "2019-12-18T15:46:24.908Z",
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
      },
      {
        "_id": "5e00bab2e61c501fa073a988",
        "name": "Статус-5",
        "__v": 0
      },
      {
        "_id": "5e01e3edde66ad15249fdd3e",
        "name": "Статус-1",
        "__v": 0
      }
    ],
    search: [],
    edit: {
      drawerOpen: false
    }
  }

  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <TableOrders {...props} />
      </Router>
    </Provider>
  )
  const tree = toJson(wrapper)

  it(`+++ renderer the Table component`, () => {
    expect(tree).toMatchSnapshot()
  })
})
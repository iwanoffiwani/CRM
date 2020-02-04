import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Settings } from '../Settings'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

describe('Tests Settings component', () => {
  const mapStateToProps = {
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
        "name": "Домашний тел",
        "__v": 0
      },
      {
        "value": "",
        "_id": "5e00b1bfa63229263405fd21",
        "name": "Паспорт",
        "__v": 0
      }
    ],
    statuses: [
      {
        "_id": "5e28378cfa502c1edc0e7689",
        "name": "Статус-1",
        "__v": 0
      },
      {
        "_id": "5e283799fa502c1edc0e768b",
        "name": "Статус-2",
        "__v": 0
      },
      {
        "_id": "5e28379ffa502c1edc0e768c",
        "name": "Статус-4",
        "__v": 0
      },
      {
        "_id": "5e2837a5fa502c1edc0e768d",
        "name": "Статус-5",
        "__v": 0
      }
    ]
  }

  it('+++ renderer component', () => {
    const wrapper = shallow(<Settings {...mapStateToProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()

    const boxWrapper = wrapper.find(Box)
    expect(boxWrapper.length).toEqual(2)

    const typographyWrapper = wrapper.find(Typography)
    expect(typographyWrapper.length).toEqual(2)
  })
})
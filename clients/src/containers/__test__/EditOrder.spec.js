import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import fetchMock from 'fetch-mock'
import assert from 'assert'

import { EditOrder } from '../EditOrder'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

describe('Tests EditOrder component', () => {
  const props = {
    editOrder: {
      "_id": "5e28371aa7b3b8210c9d38de",
      "name": "Новая заявка-35",
      "user": "5da47a1353265a14c80ef289",
      "fields": [
        {
          "value": "+7 666 666 66 66",
          "_id": "5dcac8a093dd3b05f8cb0adc",
          "name": "Мобильный телефон"
        },
        {
          "value": "79 98 666 555",
          "_id": "5df9f19e1607be20381256e8",
          "name": "Номер паспорта"
        },
        {
          "value": "516 69 69 ",
          "_id": "5dfa29e98ef6f51a186c395e",
          "name": "Домашний тел"
        },
        {
          "value": "79 98 654 654",
          "_id": "5e00b1bfa63229263405fd21",
          "name": "Паспорт"
        }
      ],
      "status": {
        "_id": "5e28379ffa502c1edc0e768c",
        "name": "Статус-4"
      },
      "comments": [],
      "changes": [
        {
          "data": "2020-01-22T11:53:27.209Z",
          "_id": "5e2837b7fa502c1edc0e768e",
          "user": "test@test",
          "previousState": {
            "status": "None"
          },
          "nextState": {
            "status": "Статус-2"
          }
        }
      ]
    }
  }

  const mapStateToProps = {
    statuses: [
      {
        "_id": "5e28378cfa502c1edc0e7689",
        "name": "Статус-1"
      },
      {
        "_id": "5e283799fa502c1edc0e768b",
        "name": "Статус-2"
      },
      {
        "_id": "5e28379ffa502c1edc0e768c",
        "name": "Статус-4"
      },
      {
        "_id": "5e2837a5fa502c1edc0e768d",
        "name": "Статус-5"
      }
    ],
    user: {
      data: {
        login: "test@test"
      }
    }
  }

  const mapDispatchToProps = {
    update: jest.fn()
  }

  it('+++ renderer component', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ Checking if the order name is in the field', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)

    const {
      editOrder: {
        name
      }
    } = props

    const orderLabelWrapper = wrapper.find(TextField).at(0)
    expect(orderLabelWrapper.props().value).toEqual(name)
  })

  it('+++ getting the correct status value', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)

    const {
      editOrder: {
        status: {
          name
        }
      }
    } = props

    const statusOrderWrapper = wrapper.find(Select).at(0)
    expect(statusOrderWrapper.props().value).toEqual(name)
  })

  it('+++ check for statuses in the order', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)

    const {
      statuses
    } = mapStateToProps

    const statusesOrderWrapper = wrapper.find(MenuItem)
    expect(statusesOrderWrapper.at(0).props().value).toEqual(statuses[0].name)
  })

  it('+++ simulation of order status change', async () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)

    const {
      editOrder: {
        status: {
          name, _id
        }
      }
    } = props

    const {
      statuses
    } = mapStateToProps

    const selectOrderWrapper = wrapper.find(Select).at(0)
    expect(selectOrderWrapper.props().value).toEqual(name)

    const nextStatus = name === statuses[0].name ? statuses[1].name : statuses[0].name  
    const nextStatusID = _id === statuses[0]._id ? statuses[1]._id : statuses[0]._id  

    selectOrderWrapper.simulate('change', { 
      _targetInst: {
        stateNode: {
          id: nextStatusID
        }
      },
      target: { 
        value: nextStatus 
      } 
    })

    expect(wrapper.find(Select).at(0).props().value).toEqual(nextStatus)
  })

  it('+++ check for fields in the order', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)

    const {
      editOrder: {
        fields
      }
    } = props

    // Если первое поле получило верное значение, значит цикл отработал правильно.
    // Поля заявки должны часто изменяются, по этому проверяем по первому объекту в массиве.
    const orderFieldsWrapper = wrapper.find(TextField).at(1)
    expect(orderFieldsWrapper.props().value).toEqual(fields[0].value)
  })

  it('+++ simulation of changing field data', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)

    const {
      editOrder: {
        fields
      }
    } = props

    const orderFieldsWrapper = wrapper.find(TextField).at(1)
    expect(orderFieldsWrapper.props().value).toEqual(fields[0].value)

    const nextValue = 'Some new value'
    
    orderFieldsWrapper.simulate('change', { 
      target: { 
        value: nextValue,
        name: orderFieldsWrapper.props().name,
      } 
    })

    expect(wrapper.find(TextField).at(1).props().value).toEqual(nextValue)
  })

  it('+++ fetch an application with changed fields and status (without displaying changes)', async () => {
    const url = new URL('http://localhost:5000/api/orders')
    const params = { id: props.editOrder._id }

    url.search = new URLSearchParams(params).toString()

    fetchMock.mock(url, 200)

    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        "_id": "5e28371aa7b3b8210c9d38de",
        "name": "Новая заявка-35",
        "user": "5da47a1353265a14c80ef289",
        "fields": [
          {
            "value": "+7 999 999 99 99",
            "_id": "5dcac8a093dd3b05f8cb0adc",
            "name": "Мобильный телефон"
          },
          {
            "value": "79 98 666 665",
            "_id": "5df9f19e1607be20381256e8",
            "name": "Номер паспорта"
          },
          {
            "value": "516 69 69 ",
            "_id": "5dfa29e98ef6f51a186c395e",
            "name": "Домашний тел"
          },
          {
            "value": "79 98 654 654",
            "_id": "5e00b1bfa63229263405fd21",
            "name": "Паспорт"
          }
        ],
        "status": {
          "_id": "5e28378cfa502c1edc0e7689",
          "name": "Статус-1"
        },
        "comments": [],
        "changes": [
          {
            "data": "2020-01-22T11:53:27.209Z",
            "_id": "5e2837b7fa502c1edc0e768e",
            "user": "test@test",
            "previousState": {
              "status": "None"
            },
            "nextState": {
              "status": "Статус-2"
            }
          }
        ]
      })
    })

    assert(res)
    fetchMock.restore()
  })

  it('+++ simulation of changing the comment input field', () => {
    const wrapper = shallow(<EditOrder {...props}{...mapStateToProps}{...mapDispatchToProps} />)
    
    const textFieldWrapper = wrapper.find(TextField).last()
    expect(textFieldWrapper.props().value).toEqual('')

    const comment = 'Some comments'

    textFieldWrapper.simulate('change', {
      target: {
        value: comment
      }
    })

    expect(wrapper.find(TextField).last().props().value).toEqual(comment)
  })

  it('+++ fetch a new comment', async () => {
    const url = new URL('http://localhost:5000/api/orders')
    const params = { id: props.editOrder._id }

    url.search = new URLSearchParams(params).toString()

    fetchMock.mock(url, 200)
      
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        "comments": [{
          user: 'test@test',
          content: 'Some new comment'
        }]
      })
    })

    assert(res)
    fetchMock.restore()
  })
})
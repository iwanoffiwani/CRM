import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import fetchMock from 'fetch-mock'
import assert from 'assert'

import { EditFields } from '../EditFields'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'

describe('Tests EditFields component', () => {
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
    ]
  }

  it('+++ renderer EditFields component', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ simulation of a click event on the field editing button', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)

    const editButtonWrapper = wrapper.find(Fab).at(0)
    editButtonWrapper.simulate('click')

    const textFieldWrapper = wrapper.find(TextField).at(0)
    expect(textFieldWrapper.props().value).toBe(mapStateToProps.fields[0].name)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ simulation of field name change', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)

    const addButtonWrapper = wrapper.find(Fab).last()
    addButtonWrapper.simulate('click')

    const textFieldWrapper = wrapper.find(TextField).at(0)
    expect(textFieldWrapper.props().value).toBe('')

    textFieldWrapper.simulate('change', { target: { value: 'Some field name' } })
    expect(wrapper.find(TextField).at(0).props().value).toBe('Some field name')

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ fetch a new field name', async () => {
    // Конструктор new URLSearchParams() не имеет поддержки в IE*
    const url = new URL('http://localhost:5000/api/fields')
    const params = { id: mapStateToProps.fields[0]._id }

    url.search = new URLSearchParams(params).toString()

    fetchMock.mock(url, 200)
      
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        name: 'Some new field name'
      })
    })

    assert(res)
    fetchMock.restore()
  })

  it('+++ simulation of a click event on the field delete button', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)

    const deleteButtonWrapper = wrapper.find(Fab).at(1)
    deleteButtonWrapper.simulate('click')

    const listItemTextWrapper = wrapper.find(ListItemText).at(0)
    expect(listItemTextWrapper.props().primary).toBe('Вы уверены, что хотите удалить это поле безвозвратно?')

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ fetch delete field', async () => {
    // Конструктор new URLSearchParams() не имеет поддержки в IE*
    const url = new URL('http://localhost:5000/api/fields')
    const params = { id: mapStateToProps.fields[0]._id }

    url.search = new URLSearchParams(params).toString()

    fetchMock.mock(url, 200)
      
    const res = await fetch(url, { method: 'DELETE' })

    assert(res)
    fetchMock.restore()
  })

  it('+++ simulation of a click event on the field clear button', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)

    const editButtonWrapper = wrapper.find(Fab).at(0)
    editButtonWrapper.simulate('click')

    expect(toJson(wrapper)).toMatchSnapshot()

    const clearButtonWrapper = wrapper.find(Fab).at(1)
    clearButtonWrapper.simulate('click')

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ simulation of a click event on the field add button', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)

    const addButtonWrapper = wrapper.find(Fab).last()
    addButtonWrapper.simulate('click')

    const textFieldWrapper = wrapper.find(TextField).at(0)
    expect(textFieldWrapper.props().value).toBe('')

    expect(toJson(wrapper)).toMatchSnapshot()
  })  

  it('+++ simulation of adding name a new field', () => {
    const wrapper = shallow(<EditFields {...mapStateToProps} />)

    const addButtonWrapper = wrapper.find(Fab).last()
    addButtonWrapper.simulate('click')

    const textFieldWrapper = wrapper.find(TextField).at(0)
    expect(textFieldWrapper.props().value).toBe('')

    textFieldWrapper.simulate('change', { target: { value: 'Some field name' } })
    expect(wrapper.find(TextField).at(0).props().value).toBe('Some field name')

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ fetch add new field', async () => {
    fetchMock.mock('http://localhost:5000/api/fields', 201)
      
    const res = await fetch('http://localhost:5000/api/fields', { 
      method: 'POST',
      body: {
        name: 'Some a new field name'
      }
    })

    assert(res)
    fetchMock.restore()
  })
})
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import fetchMock from 'fetch-mock'
import assert from 'assert'

import { Login } from '../Login'
import TextField from '@material-ui/core/TextField'

describe('Tests Login component', () => {
  it('+++ renderer component', () => {
    const wrapper = shallow(<Login />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ simulate of changing inputs value', () => {
    const query = {
      login: 'test@test',
      password: 'testtesttest'
    }

    const wrapper = shallow(<Login />)

    expect(wrapper.find(TextField).at(0).props().value).toBe('')
    expect(wrapper.find(TextField).at(1).props().value).toBe('')

    wrapper.find(TextField).at(0).simulate('change', { target: { value: query.login } })
    wrapper.find(TextField).at(1).simulate('change', { target: { value: query.password } })

    expect(wrapper.find(TextField).at(0).props().value).toBe(query.login)
    expect(wrapper.find(TextField).at(1).props().value).toBe(query.password)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('+++ fetch data for authorization success', async () => {
    fetchMock.mock('/api/auth/login', 200)
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login: 'test@test',
        password: 'testtesttest'
      })
    })

    assert(res)
    fetchMock.restore()

    expect(toJson(shallow(<Login />))).toMatchSnapshot()
  })

  it('+++ fetch data for authorization error', async () => {
    fetchMock.mock('/api/auth/login', {
      body: { 
        message: 'Неверный логин или пароль'
      },
      status: 404
    })
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login: 'test@test',
        password: 'password'
      })
    })
    assert(res)
    fetchMock.restore()

    expect(
      toJson(
        shallow(
          <Login 
            message={res.body.message}
            error={res.status} 
          />
        )
      )
    ).toMatchSnapshot()
  })
})
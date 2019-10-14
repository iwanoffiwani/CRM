import React, { Component } from 'react'
import axios from 'axios'

class Auth extends Component {

  state = {
    name: '',
    password: '369369'
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })

    console.log(this.state.name)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      login: "1",
      password: "369369"
    }

    axios.get('http://localhost:5000/api/auth/login', user)
      .then(res => console.log(res))
        .catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="login" onChange={this.handleChange} placeholder="Логин"/>
        <input type="password" name="password" placeholder="Пароль"/>
        <button type="submit">Отправить</button>
      </form>
    )
  }
}

export default Auth
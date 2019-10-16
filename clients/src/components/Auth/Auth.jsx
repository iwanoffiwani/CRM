import React, { Component } from 'react'
import axios from 'axios'
import Token from "../../api/Token/"

class Auth extends Component {

  state = {
    login: 'test@test',
    password: '369369',
    prop: ''
  }

  handleChange = (e) => {
    this.setState({
      login: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      login: this.state.login,
      password: this.state.password
    }

    axios.post('/api/auth/login', user)
      .then(res => {
          const { token } = res.data
          localStorage.setItem('jwtToken', token);
          Token(localStorage.jwtToken)
        })
        .catch(error => console.log(error))
    
  
  }

  render() {
    const request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
      return console.log(request.getAllResponseHeaders())
    }

    request.open('HEAD', document.location, true);
    request.send(null);

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
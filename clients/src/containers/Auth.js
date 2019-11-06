import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { addUser } from '../redux/actions'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import setAuthToken from '../utils/setAuthToken'

const useStyles = theme => ({
  container: {
    display: 'flex',
    minHeight:'100vh',
    alignItems: 'center',
    marginTop: '-5%'
  },
  submit: {
    marginTop: '2em'
  }
})

class Auth extends Component {
  state = {
    login: '',
    password: '',
    error: ''
  }

  changeHandler = (e) => {
    return this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()

    const user = {
      login: this.state.login,
      password: this.state.password
    }

    axios.post('/api/auth/login', user)
      .then(res => {
        const { token } = res.data

        localStorage.setItem('jwtToken', token)
        setAuthToken(token)

        const decoded = jwt_decode(token)
        const { auth } = this.props 

        auth(decoded) // redux dispatch

        return this.props.history.push('/')
      })
      .catch(err => {
        const { message } = err.response.data
        return this.setState({ error: message })
      })
  }
  
  render() {
    const { classes } = this.props

    return (
      <Container maxWidth='xs' className={classes.container}>
        <form style={{ width: '100%' }} onSubmit={this.submitHandler}>
          {
            this.state.error ? 
            <Typography
            color='error'
            variant='caption'
            >{this.state.error}</Typography> : false
          }
          <Typography
          color='textPrimary'
          variant='h5'
          >Вход в систему</Typography>
          <FormGroup>
            <TextField
            type='text'
            name='login'
            label='Логин'
            error={this.state.error}
            value={this.state.login}
            margin='normal'
            variant='outlined'
            onChange={this.changeHandler}
            placeholder='Введите ваш логин'
            />
          </FormGroup>
          <FormGroup>
            <TextField
            type='password'
            name='password'
            label='Пароль'
            error={this.state.error}
            value={this.state.password}
            margin='normal'
            variant='outlined'
            onChange={this.changeHandler}
            placeholder='Введите ваш пароль'
            />
          </FormGroup>
          <Button
          type='submit'
          size='medium'
          color='primary'
          variant='contained'
          className={classes.submit}
          >Войти</Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: user => dispatch(addUser(user))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Auth)) 
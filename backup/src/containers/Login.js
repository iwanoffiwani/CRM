import React, { Component } from 'react'
import { connect } from 'react-redux'
import { errorCreator, userCreator } from '../redux/actions/'
import store from '../redux/store'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../shared/setAuthToken'
import history from '../history/'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    marginTop: '-5%'
  },
  submit: {
    marginTop: '2em'
  }
})

const MyContainer = ({ children }) => {
  const classes = useStyles()

  return (
    <Container maxWidth='xs' className={classes.container}>
      {children}
    </Container>
  )
}

const MySubmitButton = () => {
  const classes = useStyles()

  return (
    <Button
    type='submit'
    size='medium'
    color='primary'
    variant='contained'
    className={classes.submit}
    >Войти</Button>
  )
}

class Login extends Component {
  constructor() {
    super()

    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)

    this.state = {
      login: '',
      password: '',
      error: ''
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth) 
      return this.props.history.push('/')

    if (nextProps.error)
      return this.setState({
        error: nextProps.error.message
      })
  }

  componentDidMount() {
    if(this.props.auth) {
        this.props.history.push('/');
    }
  }

  changeHandler(e) {
    return this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler(e) {
    e.preventDefault()

    const user = this.state

    axios.post('/api/auth/login', user)
      .then(res => {
        const { token } = res.data
        const decoded = jwt_decode(token)

        localStorage.setItem('jwtToken', token)
        setAuthToken(token)

        store.dispatch(userCreator(decoded))

        return history.push('/')
      })
      .catch(err => store.dispatch(errorCreator(err.response.data)))
  }
  
  render() {
    return (
      <MyContainer>
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
          <MySubmitButton />
        </form>
      </MyContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.payload,
  error: state.error.payload
})

export default connect(mapStateToProps)(Login)
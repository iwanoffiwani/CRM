import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { loginUser } from '../redux/actions'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
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

export const Login = props => {

  const classes = useStyles()

  const { error, message } = props

  const initialState = {
    user: {
      data: {
        login: '',
        password: ''
      }
    }
  }

  const [ state, setState ] = useState(initialState)

  const changeLoginHandler = e => {
    return setState({
      ...state,
      user: {
        ...state.user,
        data: {
          ...state.user.data,
          login: e.target.value
        }
      }
    })
  }

  const changePasswordHandler = e => {
    return setState({
      ...state,
      user: {
        ...state.user,
        data: {
          ...state.user.data,
          password: e.target.value
        }
      }
    })
  }

  const submitHandler = e => {
    e.preventDefault()

    const { login, password } = state.user.data
    props.authorization({ login, password }, props.history)

    return setState({
      ...initialState
    })
  }

  return (
    <Container maxWidth='xs' className={classes.container}>
      <form style={{ width: '100%' }} onSubmit={submitHandler}>
        {
          error ? 
          <Typography
          color='error'
          variant='caption'
          >{message}</Typography> : false
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
          error={error}
          value={state.user.data.login}
          margin='normal'
          variant='outlined'
          onChange={changeLoginHandler}
          placeholder='Введите ваш логин'
          />
        </FormGroup>
        <FormGroup>
          <TextField
          type='password'
          name='password'
          label='Пароль'
          error={error}
          value={state.user.data.password}
          margin='normal'
          variant='outlined'
          onChange={changePasswordHandler}
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

const mapStateToProps = state => {
  return {
    error: state.authorization.payload.error,
    message: state.authorization.payload.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authorization: (user, history) => dispatch(loginUser(user, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
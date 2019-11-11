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

const Login = props => {

  const classes = useStyles()

  const { auth, error, message } = props

  const [ login, setLogin ] = useState('')

  const [ password, setPassword ] = useState('')

  const submitHandler = async e => {
    e.preventDefault()

    const user = { login, password }
    return auth(user, props.history)
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
          value={login}
          margin='normal'
          variant='outlined'
          onChange={e => setLogin(e.target.value)}
          placeholder='Введите ваш логин'
          />
        </FormGroup>
        <FormGroup>
          <TextField
          type='password'
          name='password'
          label='Пароль'
          error={error}
          value={password}
          margin='normal'
          variant='outlined'
          onChange={e => setPassword(e.target.value)}
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
    error: state.auth.payload.error,
    message: state.auth.payload.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (user, history) => dispatch(loginUser(user, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList } from '../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import green from '@material-ui/core/colors/green'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2rem 0'
  },
  error: {
    margin: 0,
    marginBottom: theme.spacing(1)
  },
  success: {
    margin: 0,
    marginBottom: theme.spacing(1),
    color: green[500]
  },
  formControl: {
    margin: 0
  },
  textField: {
    margin: 0,
    marginBottom: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: '1.5em'
  }, 
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6)
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  hiddenInput: {
    visibility: 'hidden'
  }
}))

const CreateOrder = props => {
  const classes = useStyles()

  const initialState = {
    response: {
      success: {
        status: null,
        message: null
      },
      error: {
        status: null,
        message: null
      }
    },
    query: {
      status: {
        name: props.statuses[0].name
      },
      name: '',
      fields: [...props.fields]
    }
  }

  const [ state, setState ] = useState(initialState)

  const changeNameHandler = e => {
    return setState({
      ...state,
      query: {
        ...state.query,
        name: e.target.value
      }
    })
  }

  const changeStatusHandler = e => {
    return setState({
      ...state,
      query: {
        ...state.query,
        status: {
          name: e.target.value
        }
      }
    })
  }

  const changeFieldsHandler = e => {
    return setState({
      ...state,
      query: {
        ...state.query,
        fields: state.query.fields.map(field => {
          if (field.name === e.target.name) {
            return {
              ...field,
              value: e.target.value
            }
          } else {
            return field
          }
        })
      }
    })
  }

  const submitHandler = e => {
    e.preventDefault()

    return axios.post('/api/orders', state.query)
      .then(res => setState({
        ...initialState,
        response: {
          ...initialState.response,
          success: {
            status: res.status,
            message: res.data
          }
        }
      }))
      .catch(err => setState({ 
        ...initialState,
        response: {
          ...initialState.response,
          error: {
            status: err.response.status,
            message: `Oops, что то пошло не так.`
          }
        }
      }))
      .then(() => props.update())
  }

  const fields = state.query.fields.map((field, index) => 
    <TextField
      className={classes.textField}
      key={index}
      type='text'
      label={field.name}
      name={field.name}
      value={field.value}
      variant='outlined'
      onChange={changeFieldsHandler}
      fullWidth={true}/>
  )

  const statuses = props.statuses.map((status, index) => 
    <MenuItem 
      id={status._id}
      key={index}
      value={status.name}>
      {status.name}
    </MenuItem>
  ) 

  return (
    <form onSubmit={submitHandler}  className={classes.root}>
      <Container>
        {
          state.response.error.status ? 
          <Typography
            color='error'
            className={classes.error}
            variantMapping={{ h3: 'h3' }}
          >{state.response.error.message}</Typography> : false
        }
        {
          state.response.success.status ? 
          <Typography
            color='error'
            className={classes.success}
            variantMapping={{ h3: 'h3' }}
          >{state.response.success.message}</Typography> : false
        }
        <Typography 
          className={classes.title} 
          variant='h2' 
          noWrap>
          Новая заявка
        </Typography>
        <TextField
          label='Название заявки'
          type='text'
          name='name'
          value={state.query.name}
          margin='normal'
          variant='outlined'
          onChange={changeNameHandler}
          fullWidth={true}
          className={classes.textField}
        />
        <Divider className={classes.divider}/>
        <Typography 
          className={classes.title} 
          variant='h3' 
          noWrap>
          Статус заявки
        </Typography >
        <Select
          id="demo-simple-select-outlined"
          value={state.query.status.name}
          variant='outlined'
          onChange={changeStatusHandler}
          fullWidth={true}>
          {statuses}
        </Select>
        <Divider 
          className={classes.divider}/>
        <Typography 
          className={classes.title} 
          variant='h3' 
          noWrap>
          Произвольные поля
        </Typography >
        {fields}
        <Divider 
          className={classes.divider}/>
        {state.query.name.length < 1 ? 
          <Button 
            variant='contained' 
            disabled>
            Добавить заявку
          </Button> : 
          <Button 
          variant='contained' 
          color='primary' 
          type='submit'>
            Добавить заявку
          </Button>}
      </Container>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    statuses: state.statuses.payload,
    fields: state.fields.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
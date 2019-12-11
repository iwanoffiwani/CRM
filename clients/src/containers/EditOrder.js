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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import green from '@material-ui/core/colors/green'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  comment: {
    width: 720
  },
  list: {
    padding: 0
  },
  listItem: {
    paddingRight: 0,
    paddingLeft: 0
  },
  data: {
    display: 'block',
    marginTop: theme.spacing(1)
  },
  hiddenInput: {
    visibility: 'hidden'
  }
}))

const EditOrder = props => {
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
      ...props.order
    },
    comment: ''
  }

  const [ state, setState ] = useState(initialState)

  const changeHandler = e => {
    return setState({
      ...state,
      query: {
        ...state.query,
        [e.target.name]: e.target.value
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

  const changeCommentsHandler = e => {
    return setState({
      ...state,
      [e.target.name]: e.target.value 
    })
  }

  const commentSubmitHandler = e => {
    e.preventDefault()

    return axios({
        method: 'PATCH',
        url: `/api/orders/`,
        params: {
          id: state.query._id
        },
        data: {
          comments: [
            ...state.query.comments,
            {   
              user: props.user,
              content: state.comment 
            }
          ]
        },
      })
      .then(res => setState({
        ...state,
        response: {
          ...initialState.response,
          success: {
            status: res.status,
            message: res.data
          }
        },
        comment: ''
      }))
      .catch(err => setState({ 
        ...state,
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

  const submitHandler = e => {
    e.preventDefault()

    return axios({
        method: 'PATCH',
        url: `/api/orders/`,
        params: {
          id: state.query._id
        },
        data: {
          ...state.query
        },
      })
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
    <div className={classes.root}>
      <form onSubmit={submitHandler}>
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
            Редактирование
          </Typography>
          <TextField
            label='Название заявки'
            type='text'
            name='name'
            value={state.query.name}
            margin='normal'
            variant='outlined'
            onChange={changeHandler}
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
            id='demo-simple-select-outlined'
            value={state.query.status}
            variant='outlined'
            onChange={changeHandler}
            fullWidth={true}
            inputProps={{ name: 'status' }}>
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
              Редактировать заявку
          </Button> : 
          <Button 
          variant='contained' 
          color='primary' 
          type='submit'>
            Редактировать заявку
          </Button>}
        </Container>
      </form>
      <Container>
        <Typography 
          className={classes.title} 
          variant='h2' 
          noWrap
        >Комментарии
        </Typography>
        <List className={classes.list}>
          {state.query.comments.map(comment =>
            <ListItem
              key={comment._id} 
              className={classes.listItem}
            ><ListItemText
                primary={`Пользователь ${comment.user} оставил комментарий`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      {/* {comment.user} */}
                    </Typography>
                    {` — ${comment.content} `}
                    <small className={classes.data}>{comment.data}</small>
                  </React.Fragment>
                }
              />
            </ListItem>
          )}
        </List>
        <form className={classes.comment} onSubmit={commentSubmitHandler}>
          <TextField
            id='name'
            type='text'
            label='Комментарий'
            name='comment'
            margin='dense'
            value={state.comment}
            onChange={changeCommentsHandler}
            fullWidth
          />
          <Divider 
            className={classes.divider}
          />
          {state.comment.length < 1 ? 
          <Button 
            variant='contained' 
            disabled
          >Добавить
          </Button> : 
          <Button 
            variant='contained' 
            color='primary' 
            type='submit'
          >Добавить
          </Button>}
        </form>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.payload.user.login,
    statuses: state.status.payload,
    fields: state.fields.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder)

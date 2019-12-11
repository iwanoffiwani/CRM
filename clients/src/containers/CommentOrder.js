import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList } from '../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: '1.5em'
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6)
  }
}))

const CommentOrder = props => {
  const classes = useStyles()

  const initialState = {
    comments: [...props.comments],
    orderID: props.orderID,
    query: {
      comment: ''
    }
  }

  const [ state, setState ] = useState(initialState)

  const submitHandler = e => {
    e.preventDefault()

    return axios({
        method: 'PATCH',
        url: `/api/orders/`,
        params: {
          id: state.orderID
        },
        data: {
          
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

  const changeHandler = e => {
    return setState({
      ...state,
      query: {
        ...state.query,
        [e.target.name]: e.target.value
      }
    })
  }
  
  return (
    <Container>
      <form>
        <Typography 
          className={classes.title} 
          variant='h2' 
          noWrap
        >Комментарии
        </Typography>
        <TextField
          id='name'
          type='text'
          label='Комментарий'
          name='comment'
          margin='dense'
          value={state.query.comment}
          onChange={changeHandler}
          fullWidth
        />
        <Divider 
          className={classes.divider}
        />
        {state.query.comment.length < 1 ? 
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
  )
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(null, mapDispatchToProps)(CommentOrder)
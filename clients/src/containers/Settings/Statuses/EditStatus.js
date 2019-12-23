import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchStatuses } from '../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import ListItem from '@material-ui/core/ListItem'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import StatusesContext from './StatusesContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const EditStatus = props => {

  const classes = useStyles()

  const initialState = {
    status: {
      name: ''
    }
  }

  const [ state, setState ] = useState(initialState)

  const changeNameHandler = e => {
    return setState({
      ...state,
      status: {
        ...state.status,
        name: e.target.value
      }
    })
  }

  const submitEditStatus = context => {
    return axios({
      method: 'PATCH',
      url: `/api/statuses/`,
      params: {
        id: context.status.edit.id
      },
      data: {
        name: state.status.name
      }
    })
    .then(() => 
      props.statusesUpdate()
    )
    .then(() => 
      props.ordersListUpdate()
    )
    .then(() => 
      setState({ 
        ...initialState 
      })
    )
    .then(() => 
      context.func.default()
    )
  }

  return (
    <StatusesContext.Consumer>
      {context => (
        <ListItem>
          <Fab className={classes.icon} onClick={() => submitEditStatus(context)}>
            <CheckIcon />
          </Fab>
          <Fab className={classes.icon} onClick={context.func.default}>
            <ClearIcon />
          </Fab>
          <TextField
            value={state.status.name}
            onChange={changeNameHandler}
            placeholder='Введите новое имя'
          />
        </ListItem>
      )}
    </StatusesContext.Consumer>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    statusesUpdate: () => dispatch(fetchStatuses())
  }
}

export default connect(null, mapDispatchToProps)(EditStatus)
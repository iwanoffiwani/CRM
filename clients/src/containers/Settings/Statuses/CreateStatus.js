import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchStatuses } from '../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'
import StatusesContext from './StatusesContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const CreateStatus = props => {
  
  const classes = useStyles()

  const initialState = { 
    status: {
      name: ''
    } 
  }

  const [ state, setState ] = useState(initialState)
  
  const changeNameStatus = e => {
    return setState({
      ...state,
      status: {
        ...state.status,
        name: e.target.value
      }
    })
  }

  const submitCreateStatus = context => {
    return axios({
      method: 'POST',
      url: `/api/statuses/`,
      data: {
        name: state.status.name
      }
    })
    .then(() => 
      props.ordersListUpdate()
    )
    .then(() => 
      props.statusesUpdate()
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
      {context => {
        if (context.status.create.init)
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={() => submitCreateStatus(context)}>
                <CheckIcon />
              </Fab>
              <Fab className={classes.icon} onClick={context.func.default}>
                <ClearIcon />
              </Fab>
              <TextField
                value={state.status.name}
                onChange={changeNameStatus}
                placeholder='Введите имя поля'
              />
            </ListItem>
          )
        else 
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={context.func.create}>
                <AddIcon />
              </Fab>
              <ListItemText>
                Добавить поле
              </ListItemText>
            </ListItem>
          )
      }}
    </StatusesContext.Consumer>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    statusesUpdate: () => dispatch(fetchStatuses())
  }
}

export default connect(null, mapDispatchToProps)(CreateStatus)
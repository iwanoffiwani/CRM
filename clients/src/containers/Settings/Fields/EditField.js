import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchFields } from '../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import ListItem from '@material-ui/core/ListItem'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import FieldsContext from './FieldsContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const EditField = props => {

  const classes = useStyles()

  const initialState = {
    field: {
      name: ''
    }
  }

  const [ state, setState ] = useState(initialState)

  const changeNameHandler = e => {
    return setState({
      ...state,
      field: {
        ...state.field,
        name: e.target.value
      }
    })
  }

  const submitEditField = context => {
    return axios({
      method: 'PATCH',
      url: `/api/fields/`,
      params: {
        id: context.field.edit.id
      },
      data: {
        name: state.field.name
      }
    })
    .then(() => 
      props.fieldsUpdate()
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
    <FieldsContext.Consumer>
      {context => (
        <ListItem>
          <Fab className={classes.icon} onClick={() => submitEditField(context)}>
            <CheckIcon />
          </Fab>
          <Fab className={classes.icon} onClick={context.func.default}>
            <ClearIcon />
          </Fab>
          <TextField
            value={state.field.name}
            onChange={changeNameHandler}
            placeholder='Введите новое имя'
          />
        </ListItem>
      )}
    </FieldsContext.Consumer>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    fieldsUpdate: () => dispatch(fetchFields())
  }
}

export default connect(null, mapDispatchToProps)(EditField)
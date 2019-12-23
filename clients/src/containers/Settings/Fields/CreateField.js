import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchFields } from '../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'
import FieldsContext from './FieldsContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const CreateField = props => {
  
  const classes = useStyles()

  const initialState = { 
    field: {
      name: ''
    } 
  }

  const [ state, setState ] = useState(initialState)
  
  const changeNameField = e => {
    return setState({
      ...state,
      field: {
        ...state.field,
        name: e.target.value
      }
    })
  }

  const submitCreateField = context => {
    return axios({
      method: 'POST',
      url: `/api/fields/`,
      data: {
        name: state.field.name
      }
    })
    .then(() => 
      props.ordersListUpdate()
    )
    .then(() => 
      props.fieldsUpdate()
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
      {context => {
        if (context.field.create.init)
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={() => submitCreateField(context)}>
                <CheckIcon />
              </Fab>
              <Fab className={classes.icon} onClick={context.func.default}>
                <ClearIcon />
              </Fab>
              <TextField
                value={state.field.name}
                onChange={changeNameField}
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
    </FieldsContext.Consumer>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    fieldsUpdate: () => dispatch(fetchFields())
  }
}

export default connect(null, mapDispatchToProps)(CreateField)
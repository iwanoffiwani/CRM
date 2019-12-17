import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const DeleteField = props => {
  const classes = useStyles()
  return (
    <ListItem>
      <Fab className={classes.icon} onClick={() => props.deleteHandler()}>
        <CheckIcon />
      </Fab>
      <Fab className={classes.icon} onClick={() => props.cancelEdit()}>
        <ClearIcon />
      </Fab>
      <ListItemText>
        Вы уверены, что хотите удалить это поле безвозвратно?
      </ListItemText>
    </ListItem>
  )
}

const EditField = props => {
  const classes = useStyles()

  const initialState = { 
    name: props.name 
  }

  const [ state, setState ] = useState(initialState)

  return (
    <ListItem>
      <Fab className={classes.icon} onClick={() => props.editHandler(state.name)}>
        <CheckIcon />
      </Fab>
      <Fab className={classes.icon} onClick={() => props.cancelEdit()}>
        <ClearIcon />
      </Fab>
      <TextField
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })}
        placeholder='Введите новое имя'
      />
    </ListItem>
  )
}

const EditFields = props => {
  const classes = useStyles()

  const initialState = {
    query: [
      ...props.fields
    ],
    edit: {
      id: false,
      name: null
    },
    delete: {
      id: false
    }
  }

  const [ state, setState ] = useState(initialState)

  const handlerClickEdit = id => {
    return setState({
      ...state,
      edit: {
        id
      }
    })
  }

  const handlerClickDelete = id => {
    return setState({
      ...state,
      delete: {
        id
      }
    })
  }

  const handlerEditField = name => {
    return setState({
      ...state,
      query: props.fields.map(field => {
        if (field._id === state.edit.id) 
          return {
            ...field,
            name
          }
        
        return field
      })
    })
  }

  const handlerDeleteField = id => {
    return setState({
      ...state,
      query: props.fields.filter(field => 
        field._id !== state.delete.id)
    })
  }

  const handlerCancel = () => {
    return setState({ 
      ...initialState 
    })
  }

  return (
    <List>
      {(() => {
        if (state.edit.id)
          return (
            props.fields.map((field, index) => 
              state.edit.id === field._id ? 
              <EditField 
                key={index}
                name={field.name}
                cancelEdit={handlerCancel}
                editHandler={handlerEditField}
              /> :
              <ListItem key={index} disabled>
                <Fab className={classes.icon}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText>
                  {field.name}
                </ListItemText>
              </ListItem>
            )
          )
        else if (state.delete.id)
          return (
            props.fields.map((field, index) => 
              state.delete.id === field._id ? 
              <DeleteField 
                key={index}
                cancelEdit={handlerCancel}
                deleteHandler={handlerDeleteField}
              /> :
              <ListItem key={index} disabled>
                <Fab className={classes.icon}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText>
                  {field.name}
                </ListItemText>
              </ListItem>
            )
          )
        else 
          return (
            props.fields.map((field, index) => 
              <ListItem key={index}>
                <Fab className={classes.icon} onClick={() => handlerClickEdit(field._id)}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon} onClick={() => handlerClickDelete(field._id)}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText>
                  {field.name}
                </ListItemText>
              </ListItem>
            )
          )
      })()}
    </List>
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload
  }
}

export default connect(mapStateToProps)(EditFields)
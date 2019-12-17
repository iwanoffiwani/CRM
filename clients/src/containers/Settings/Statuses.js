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

const DeleteStatus = props => {
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

const EditStatus = props => {
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

const EditStatuses = props => {
  const classes = useStyles()

  const initialState = {
    query: [
      ...props.statuses
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

  const handlerEditStatus = name => {
    return setState({
      ...state,
      query: props.statuses.map(status => {
        if (status._id === state.edit.id) 
          return {
            ...status,
            name
          }
        
        return status
      })
    })
  }

  const handlerDeleteStatus = id => {
    return setState({
      ...state,
      query: props.statuses.filter(status => 
        status._id !== state.delete.id)
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
            props.statuses.map((status, index) => 
              state.edit.id === status._id ? 
              <EditStatus 
                key={index}
                name={status.name}
                cancelEdit={handlerCancel}
                editHandler={handlerEditStatus}
              /> :
              <ListItem key={index} disabled>
                <Fab className={classes.icon}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText>
                  {status.name}
                </ListItemText>
              </ListItem>
            )
          )
        else if (state.delete.id)
          return (
            props.statuses.map((status, index) => 
              state.delete.id === status._id ? 
              <DeleteStatus 
                key={index}
                cancelEdit={handlerCancel}
                deleteHandler={handlerDeleteStatus}
              /> :
              <ListItem key={index} disabled>
                <Fab className={classes.icon}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText>
                  {status.name}
                </ListItemText>
              </ListItem>
            )
          )
        else 
          return (
            props.statuses.map((status, index) => 
              <ListItem key={index}>
                <Fab className={classes.icon} onClick={() => handlerClickEdit(status._id)}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon} onClick={() => handlerClickDelete(status._id)}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText>
                  {status.name}
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
    statuses: state.statuses.payload
  }
}

export default connect(mapStateToProps)(EditStatuses)
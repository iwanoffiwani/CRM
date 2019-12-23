import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchFields } from '../../redux/actions'
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
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

// const DeleteField = props => {
  
//   const classes = useStyles()
  
//   return (
//     <ListItem>
//       <Fab className={classes.icon}>
//         <CheckIcon />
//       </Fab>
//       <Fab className={classes.icon}>
//         <ClearIcon />
//       </Fab>
//       <ListItemText>
//         Вы уверены, что хотите удалить это поле безвозвратно?
//       </ListItemText>
//     </ListItem>
//   )
// }

// const EditField = props => {

//   const classes = useStyles()

//   const changesFieldName = 

//   return (
//     <ListItem>
//       <Fab className={classes.icon}>
//         <CheckIcon />
//       </Fab>
//       <Fab className={classes.icon}>
//         <ClearIcon />
//       </Fab>
//       <TextField
//         value={state.name}
//         placeholder='Введите новое имя'
//       />
//     </ListItem>
//   )
// }

// const CreateField = props => {

//   const classes = useStyles()

//   return (
//     <ListItem>
//       <Fab className={classes.icon}>
//         <CheckIcon />
//       </Fab>
//       <Fab className={classes.icon}>
//         <ClearIcon />
//       </Fab>
//       <TextField
//         value={state.name}
//         onChange={e => setState({ ...state, name: e.target.value })}
//         placeholder='Введите имя поля'
//       />
//     </ListItem>
//   )
// }

// const EditFields = props => {
  
//   const classes = useStyles()
  


//   const fields = props.fields.map((field, index) => 
//     <ListItem key={index}>
//       <Fab className={classes.icon}>
//         <EditIcon />
//       </Fab>
//       <Fab className={classes.icon}>
//         <DeleteOutlineIcon />
//       </Fab>
//       <ListItemText>
//         {field.name}
//       </ListItemText>
//     </ListItem>
//   )

//   return (
//     <List>
//       {fields}
//     </List>
//   )
// }

// const mapStateToProps = state => {
//   return {
//     fields: state.fields.payload
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fieldsUpdate: () => dispatch(fetchFields()),
//     ordersUpdate: () => dispatch(fetchUpdateOrderList())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditFields)

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

const AddField = props => {
  const classes = useStyles()

  const initialState = { name: '' }

  const [ state, setState ] = useState(initialState)

  return (
    <ListItem>
      <Fab className={classes.icon} onClick={() => props.addField(state.name)}>
        <CheckIcon />
      </Fab>
      <Fab className={classes.icon} onClick={() => props.cancelEdit()}>
        <ClearIcon />
      </Fab>
      <TextField
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })}
        placeholder='Введите имя поля'
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
    },
    add: false
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
    return axios({
      method: 'PATCH',
      url: `/api/fields/`,
      params: {
        id: state.edit.id
      },
      data: {
        name
      }
    })
    .then(() => setState({ 
      ...initialState 
    })) 
    .then(() => props.fieldsUpdate())
    .then(() => props.ordersUpdate())
  }

  const handlerDeleteField = () => {
    return axios({
      method: 'DELETE',
      url: `/api/fields/`,
      params: {
        id: state.delete.id
      }
    })
    .then(() => setState({ 
      ...initialState 
    })) 
    .then(() => props.fieldsUpdate())
    .then(() => props.ordersUpdate())
  }

  const handlerCancel = () => {
    return setState({ 
      ...initialState 
    })
  }

  const handlerClickAddField = () => {
    return setState({
      ...state,
      add: true
    })
  }

  const handlerAddField = name => {
    return axios({
      method: 'POST',
      url: `/api/fields/`,
      data: {
        name
      }
    })
    .then(() => setState({ 
      ...initialState 
    })) 
    .then(() => props.fieldsUpdate())
    .then(() => props.ordersUpdate())
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
      {
        !state.add ? 
        <ListItem>
          <Fab className={classes.icon} onClick={handlerClickAddField}>
            <AddIcon />
          </Fab>
          <ListItemText>
            Добавить поле
          </ListItemText>
        </ListItem>
        : <AddField 
            addField={handlerAddField}
            cancelEdit={handlerCancel}
          />
      }
    </List>
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fieldsUpdate: () => dispatch(fetchFields()),
    ordersUpdate: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFields)
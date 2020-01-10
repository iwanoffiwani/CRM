import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchStatuses } from '../redux/actions/'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import ListItemText from '@material-ui/core/ListItemText'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    statusesUpdate: () => dispatch(fetchStatuses())
  }
}

export const EditStatuses = props => {
  
  const classes = useStyles()

  const initialState = {
    status: {
      edit: {
        id: null
      },
      delete: {
        id: null
      },
      create: {
        init: false
      }
    },
    changes: {
      status: {
        name: {
          value: ''
        }
      },
      create: {
        name: {
          value: ''
        }
      }
    }
  }

  const [ state, setState ] = useState(initialState)

  const editStatusNameHandler = e => {
    return setState({
      ...state,
      changes: {
        ...state.changes,
        status: {
          ...state.changes.status,
          name: {
            value: e.target.value
          }
        }
      }
    })
  }

  const setStatusNameHandler = e => {
    return setState({
      ...state,
      changes: {
        ...state.changes,
        create: {
          ...state.changes.create,
          name: {
            value: e.target.value
          }
        }
      }
    })
  }

  const createHandler = () => {
    return setState({
      ...state,
      status: {
        ...state.status,
        create: {
          init: true
        }
      }
    })
  }
  
  const editHandler = (id, value) => {
    return setState({
      ...state,
      status: {
        ...state.status,
        edit: {
          id
        }
      },
      changes: {
        ...state.changes,
        status: {
          name: {
            value
          }
        }
      }
    })
  }

  const deleteHandler = id => {
    return setState({
      ...state,
      status: {
        ...state.status,
        delete: {
          id
        }
      }
    })
  }

  const def = () => setState({ ...initialState })

  const fetchCreateStatus = e => {
    e.preventDefault()

    const {
      create: {
        name: {
          value: name
        }
      }
    } = state.changes

    return axios({
      method: 'POST',
      url: `/api/statuses/`,
      data: {
        name
      }
    })
    .then(() => 
      props.ordersListUpdate()
    )
    .then(() => 
      props.statusesUpdate()
    )
    .then(def()) 
  }

  const fetchEditStatus = e => {
    e.preventDefault()

    const { 
      status: {
        edit: {
          id
        }
      },
      changes: {
        status: {
          name: {
            value: name
          }
        }
      }
    } = state

    return axios({
      method: 'PATCH',
      url: `/api/statuses/`,
      params: {
        id
      },
      data: {
        name
      }
    })
    .then(() => 
      props.statusesUpdate()
    )
    .then(() => 
      props.ordersListUpdate()
    )
    .then(def())
  }

  const fetchDeleteStatus = e => {
    e.preventDefault()

    const { 
      status: {
        delete: {
          id
        }
      }
    } = state

    return axios({
      method: 'DELETE',
      url: `/api/statuses/`,
      params: {
        id
      }
    })
    .then(() => 
      props.statusesUpdate()
    )
    .then(() => 
      props.ordersListUpdate()
    )
    .then(def())
  }

  return (
    <List>
      {(() => {

        const {
          status: {
            edit,
            delete: del
          },
          changes: {
            status: {
              name: {
                value
              }
            }
          }
        } = state

        if (edit.id !== null) 
          return (
            props.statuses.map((status, index) => {
              return (
                edit.id !== status._id ?
                  <ListItem disabled key={index}>
                    <Fab className={classes.icon}>
                      <EditIcon />
                    </Fab>
                    <Fab className={classes.icon}>
                      <DeleteOutlineIcon/>
                    </Fab>
                    <ListItemText 
                      primary={status.name} 
                    />
                  </ListItem> :
                  <ListItem key={index}>
                    <Fab className={classes.icon} onClick={fetchEditStatus}>
                      <CheckIcon />
                    </Fab>
                    <Fab className={classes.icon} onClick={def}>
                      <ClearIcon />
                    </Fab>
                    <TextField
                      value={value}
                      onChange={editStatusNameHandler}
                      placeholder='Введите новое имя'
                    />
                  </ListItem>
              )
            })
          )
        else if (del.id !== null) 
          return (
            props.statuses.map((status, index) => {
              return (
                del.id !== status._id ?
                  <ListItem disabled key={index}>
                    <Fab className={classes.icon}>
                      <EditIcon />
                    </Fab>
                    <Fab className={classes.icon}>
                      <DeleteOutlineIcon/>
                    </Fab>
                    <ListItemText 
                      primary={status.name} 
                    />
                  </ListItem> :
                  <ListItem key={index}>
                    <Fab className={classes.icon} onClick={fetchDeleteStatus}>
                      <CheckIcon />
                    </Fab>
                    <Fab className={classes.icon} onClick={def}>
                      <ClearIcon />
                    </Fab>
                    <ListItemText 
                      primary='Вы уверены, что хотите удалить это поле безвозвратно?' 
                    />
                  </ListItem>
              )
            })
          )
        else if (!edit.id && !del.id) 
          return (
            props.statuses.map((status, index) => {
              return (
                <ListItem key={index}>
                  <Fab className={classes.icon} onClick={() => editHandler(status._id, status.name)}>
                    <EditIcon />
                  </Fab>
                  <Fab className={classes.icon} onClick={() => deleteHandler(status._id)}>
                    <DeleteOutlineIcon/>
                  </Fab>
                  <ListItemText 
                    primary={status.name} 
                  />
                </ListItem>
              )
            })
          )
      })()}
      {(() => {

        const {
          status: {
            create
          },
          changes: {
            create: {
              name: {
                value
              }
            }
          }
        } = state

        if (create.init)
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={fetchCreateStatus}>
                <CheckIcon />
              </Fab>
              <Fab className={classes.icon} onClick={def}>
                <ClearIcon />
              </Fab>
              <TextField
                value={value}
                onChange={setStatusNameHandler}
                placeholder='Введите имя поля'
              />
            </ListItem>
          )
        else 
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={createHandler}>
                <AddIcon />
              </Fab>
              <ListItemText 
                primary='Добавить поле' 
              />
            </ListItem>
          )
      })()}
    </List>
  )
}

EditStatuses.propTypes = {
  statuses: PropTypes.array.isRequired
}

export default connect(null, mapDispatchToProps)(EditStatuses)
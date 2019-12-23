import React, { useState } from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import StatusesContext from './StatusesContext'
import StatusItem from './StatusItem'
import EditStatus from './EditStatus'
import DeleteStatus from './DeleteStatus'
import CreateStatus from './CreateStatus'

const SettingStatuses = props => {
  
  const handlerEditStatus = id => {
    return setState({
      ...state,
      status: {
        ...state.status,
        edit: {
          id: !id ? null : id
        }
      }
    })
  }

  const handlerDeleteStatus = id => {
    return setState({
      ...state,
      status: {
        ...state.status,
        delete: {
          id: !id ? null : id
        }
      }
    })
  }

  const handlerCreateStatus = () => {
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

  const togglerDefaultState = () => {
    return setState({
      ...initialState
    })
  }

  const initialState = {
    status: {
      edit: {
        id: null,
        name: null
      },
      delete: {
        id: null
      },
      create: {
        init: false
      }
    },
    func: {
      create: handlerCreateStatus,
      edit: handlerEditStatus,
      delete: handlerDeleteStatus,
      default: togglerDefaultState
    }
  }

  const [ state, setState ] = useState(initialState)

  return (
    <StatusesContext.Provider value={state}>
      <List>
        {(() => {
          if (state.status.edit.id !== null)
            return (
              props.statuses.map((status, index) => 
                state.status.edit.id === status._id ? 
                  <EditStatus 
                    key={index} 
                    status={status}
                  /> : 
                  <StatusItem 
                    key={index} 
                    status={status}
                  /> 
              )
            )
          else if (state.status.delete.id !== null)
            return (
              props.statuses.map((status, index) => 
                state.status.delete.id === status._id ? 
                  <DeleteStatus 
                    key={index} 
                    status={status}
                  /> : 
                  <StatusItem 
                    key={index} 
                    status={status}  
                  /> 
              )
            )
          else if (!state.status.edit.id && !state.status.delete.id) 
            return (
              props.statuses.map((status, index) => 
                <StatusItem 
                  key={index} 
                  status={status}
                /> 
              )
            )
        })()}
        <CreateStatus />
      </List>
    </StatusesContext.Provider>
  )
}

const mapStateToProps = state => {
  return {
    statuses: state.statuses.payload
  }
}

export default connect(mapStateToProps)(SettingStatuses)
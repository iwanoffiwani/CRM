import React, { useState } from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import FieldsContext from './FieldsContext'
import FieldItem from './FieldItem'
import EditField from './EditField'
import DeleteField from './DeleteField'
import CreateField from './CreateField'

const SettingFields = props => {
  
  const handlerEditField = id => {
    return setState({
      ...state,
      field: {
        ...state.field,
        edit: {
          id: !id ? null : id
        }
      }
    })
  }

  const handlerDeleteField = id => {
    return setState({
      ...state,
      field: {
        ...state.field,
        delete: {
          id: !id ? null : id
        }
      }
    })
  }

  const handlerCreateField = () => {
    return setState({
      ...state,
      field: {
        ...state.field,
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
    field: {
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
      create: handlerCreateField,
      edit: handlerEditField,
      delete: handlerDeleteField,
      default: togglerDefaultState
    }
  }

  const [ state, setState ] = useState(initialState)

  return (
    <FieldsContext.Provider value={state}>
      <List>
        {(() => {
          if (state.field.edit.id !== null)
            return (
              props.fields.map((field, index) => 
                state.field.edit.id === field._id ? 
                  <EditField 
                    key={index} 
                    field={field}
                  /> : 
                  <FieldItem 
                    key={index} 
                    field={field}
                  /> 
              )
            )
          else if (state.field.delete.id !== null)
            return (
              props.fields.map((field, index) => 
                state.field.delete.id === field._id ? 
                  <DeleteField 
                    key={index} 
                    field={field}
                  /> : 
                  <FieldItem 
                    key={index} 
                    field={field}  
                  /> 
              )
            )
          else if (!state.field.edit.id && !state.field.delete.id) 
            return (
              props.fields.map((field, index) => 
                <FieldItem 
                  key={index} 
                  field={field}
                /> 
              )
            )
        })()}
        <CreateField />
      </List>
    </FieldsContext.Provider>
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload
  }
}

export default connect(mapStateToProps)(SettingFields)
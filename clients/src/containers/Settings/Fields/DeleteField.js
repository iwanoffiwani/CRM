import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchFields } from '../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import ListItem from '@material-ui/core/ListItem'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import ListItemText from '@material-ui/core/ListItemText'
import FieldsContext from './FieldsContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const DeleteField = props => {

  const classes = useStyles()

  const submitDeleteHandler = id => {
    return axios({
      method: 'DELETE',
      url: `/api/fields/`,
      params: {
        id
      }
    })
    .then(() => 
      props.fieldsUpdate()
    )
    .then(() => 
      props.ordersListUpdate()
    )
  }

  return (
    <FieldsContext.Consumer>
      {context => (
        <ListItem>
          <Fab className={classes.icon} onClick={() => submitDeleteHandler(context.field.delete.id)}>
            <CheckIcon />
          </Fab>
          <Fab className={classes.icon} onClick={context.func.default}>
            <ClearIcon />
          </Fab>
          <ListItemText>
            Вы уверены, что хотите удалить это поле безвозвратно?
          </ListItemText>
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

export default connect(null, mapDispatchToProps)(DeleteField)
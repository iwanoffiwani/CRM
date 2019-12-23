import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList, fetchStatuses } from '../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import ListItem from '@material-ui/core/ListItem'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import ListItemText from '@material-ui/core/ListItemText'
import StatusesContext from './StatusesContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const DeleteStatus = props => {

  const classes = useStyles()

  const submitDeleteHandler = id => {
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
  }

  return (
    <StatusesContext.Consumer>
      {context => (
        <ListItem>
          <Fab className={classes.icon} onClick={() => submitDeleteHandler(context.status.delete.id)}>
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
    </StatusesContext.Consumer>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    statusesUpdate: () => dispatch(fetchStatuses())
  }
}

export default connect(null, mapDispatchToProps)(DeleteStatus)
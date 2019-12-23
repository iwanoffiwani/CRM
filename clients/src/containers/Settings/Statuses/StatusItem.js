import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import ListItemText from '@material-ui/core/ListItemText'
import StatusesContext from './StatusesContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const StatusItem = ({ status }) => {

  const classes = useStyles()

  return (
    <StatusesContext.Consumer>
      {context => (
        <ListItem>
          <Fab className={classes.icon} onClick={() => context.func.edit(status._id)}>
            <EditIcon />
          </Fab>
          <Fab className={classes.icon}>
            <DeleteOutlineIcon onClick={() => context.func.delete(status._id)}/>
          </Fab>
          <ListItemText>
            {status.name}
          </ListItemText>
        </ListItem>
      )}
    </StatusesContext.Consumer>
  )
}

export default StatusItem
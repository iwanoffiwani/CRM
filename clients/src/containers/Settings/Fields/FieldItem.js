import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import ListItemText from '@material-ui/core/ListItemText'
import FieldsContext from './FieldsContext'

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}))

const FieldItem = ({ field }) => {

  const classes = useStyles()

  return (
    <FieldsContext.Consumer>
      {context => (
        <ListItem>
          <Fab className={classes.icon} onClick={() => context.func.edit(field._id)}>
            <EditIcon />
          </Fab>
          <Fab className={classes.icon}>
            <DeleteOutlineIcon onClick={() => context.func.delete(field._id)}/>
          </Fab>
          <ListItemText>
            {field.name}
          </ListItemText>
        </ListItem>
      )}
    </FieldsContext.Consumer>
  )
}

export default FieldItem
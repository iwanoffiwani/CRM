import React from 'react'
import { connect } from 'react-redux'
import { editDrawerOpen } from '../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableOrderStatus from './TableOrderStatus'

const useStyles = makeStyles(theme => ({
  fab: {
    width: 36,
    height: 36,
    marginTop: `-${theme.spacing(0.8)}px`,
    marginRight: theme.spacing(4)
  },
  editIcon: {
    width: '.8em',
    height: '.8em'
  }
}))

const TableOrders = props => {
  const classes = useStyles()

  const editOrderHandler = order => {
    if (!props.edit.drawerOpen) 
      return props.drawerOpen({
        drawerOpen: true,
        order
      })
  }

  const otherOrderFields = fields => 
    fields.map(field => 
      <TableCell 
        key={field._id}
        align='right'
      >{field.value}
      </TableCell>
    )

  return (
    props.orders.map(order => 
      <TableRow hover role='checkbox' tabIndex={-1} key={order._id}>
        <TableCell>
          <Fab 
            className={classes.fab} 
            onClick={() => editOrderHandler(order)}
            size='small'
          >
            <EditIcon 
              className={classes.editIcon}
              aria-label='edit' 
            />
          </Fab>
          {order.name}
        </TableCell>
        <TableCell>
          <TableOrderStatus 
            order={order}
          />
        </TableCell>
        {otherOrderFields(order.fields)}
      </TableRow>
    )
  )
}

const mapStateToProps = state => {
  return {
    edit: state.edit.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    drawerOpen: payload => dispatch(editDrawerOpen(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList } from '../../redux/actions'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const TableOrderStatus = props => {
  const changeStatusHandler = e => {
    const { 
      stateNode: { 
        id 
      } 
    } = e._targetInst
    
    const status = e.target.value

    return axios({
      method: 'PATCH',
      url: '/api/orders/',
      params: {
        id 
      },
      data: {
        status: {
          name: status
        },
        changes: [
          ...props.order.changes,
          {
            user: props.user.data.login,
            previousState: { // Свойство должно именоваться именно так, иначе будут серьезные проблемы
              status: props.order.status.name
            },
            nextState: {
              status
            }
          }
        ]
      },
    })
    .then(() => props.update())
  }

  const otherStatuses = orderID => 
    props.statuses.map(status =>
      <MenuItem 
        id={orderID}
        key={status._id}
        value={status.name}
      >{status.name}
      </MenuItem>
    )

  return (
    <Select
      id='demo-simple-select-outlined'
      value={props.order.status.name}
      variant='outlined'
      onChange={changeStatusHandler}
      fullWidth={true}
      inputProps={{ 
        name: 'status'
      }}
    >{otherStatuses(props.order._id)}
    </Select>
  )
}

const mapStateToProps = state => {
  return {
    user: state.authorization.payload,
    statuses: state.statuses.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrderStatus)
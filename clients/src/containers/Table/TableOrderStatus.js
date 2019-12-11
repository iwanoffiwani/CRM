import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList } from '../../redux/actions'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const TableOrderStatus = props => {
  const changeStatusHandler = e => {
    // На прямую получить id заявки нельзя,
    // потому вытаскиваем через переданые свойства
    const stateNode = e._targetInst.stateNode

    const orderID = stateNode.dataset.order
    
    const status = e.target.value

    return axios({
      method: 'PATCH',
      url: '/api/orders/',
      params: {
        id: orderID 
      },
      data: {
        status,
        changes: [
          ...props.order.changes,
          {
            user: props.user,
            previousState: {
              status: props.order.status
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
        id={status._id}
        key={status._id}
        value={status.name}
        data-order={orderID}
      >{status.name}
      </MenuItem>
    )

  return (
    <Select
      id='demo-simple-select-outlined'
      value={props.order.status}
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
    user: state.auth.payload.user.login,
    statuses: state.statuses.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrderStatus)
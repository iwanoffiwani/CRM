import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUpdateOrderList } from '../redux/actions'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Preloader from '../components/Preloader'
import green from '@material-ui/core/colors/green'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 790,
    borderRadius: 4,
    overflow: 'auto',
  },
  tabelCell: {
    minWidth: 60
  },
  tabelSelect: {
    padding: '14px 12px'
  }
})

const OrderList = props => {
  const classes = useStyles()

  const initialState = {
    pagination: {
      page: 0,
      rowsPerPage: 10
    }
  }

  const [ state, setState ] = useState(initialState)
  
  const handleChangePage = (e, page) => {
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  }

  const handleChangeRowsPerPage = e => {
    setState({
      ...state,
      pagination: {
        page: 0,
        rowsPerPage: +e.target.value
      }
    })
  }

  const changeStatusHandler = e => {
    // На прямую получить _id заявки нельзя,
    // потому вытаскиваем через переданые свойства
    const stateNode = e._targetInst.stateNode

    const orderID = stateNode.dataset.order
    
    const data = {
      [e.target.name]: e.target.value
    }

    axios({
      method: 'PATCH',
      url: `/api/orders/`,
      params: {
        id: orderID 
      },
      data,
    })
    .then(() => props.update())
  }

  const fields = props.fields.map(field => 
    <StyledTableCell
      key={field._id}
      align='right'
      className={classes.tabelCell}
    >{field.name}
    </StyledTableCell>
  )

  const orders = props.orders
    .slice(
      state.pagination.page * state.pagination.rowsPerPage, 
      state.pagination.page * state.pagination.rowsPerPage + 
      state.pagination.rowsPerPage
    )
    .map(order =>
      <TableRow hover role='checkbox' tabIndex={-1} key={order._id}>
        <TableCell>
          {order.name}
        </TableCell>
        <TableCell>
          <Select
            id="demo-simple-select-outlined"
            value={order.status}
            variant='outlined'
            onChange={changeStatusHandler}
            fullWidth={true}
            inputProps={{ 
              name: 'status'
            }}>
            {props.status.map((item, index) => 
              <MenuItem 
                id={item._id}
                key={index}
                value={item.name}
                data-order={order._id}
              >{item.name}
              </MenuItem>
            ) }
          </Select>
        </TableCell>
        {order.fields.map(field => 
          <TableCell 
            key={field._id}
            align='right'
          >{field.value}
          </TableCell>
        )}
      </TableRow>
    )

  const search = props.search
    .slice(
      state.pagination.page * state.pagination.rowsPerPage, 
      state.pagination.page * state.pagination.rowsPerPage + 
      state.pagination.rowsPerPage
    )
    .map(order =>
      <TableRow hover role='checkbox' tabIndex={-1} key={order._id}>
        <TableCell>
          {order.name}
        </TableCell>
        <TableCell>
          <Select
            id="demo-simple-select-outlined"
            value={order.status}
            variant='outlined'
            onChange={changeStatusHandler}
            fullWidth={true}
            inputProps={{ 
              name: 'status'
            }}>
            {props.status.map((item, index) => 
              <MenuItem 
                id={item._id}
                key={index}
                value={item.name}
                data-order={order._id}
              >{item.name}
              </MenuItem>
            ) }
          </Select>
        </TableCell>
        {order.fields.map(field => 
          <TableCell 
            key={field._id}
            align='right'
          >{field.value}
          </TableCell>
        )}
      </TableRow>
    )

  return (
    <Layout>
      {props.orders.length === 0 ? <Preloader /> :
        <Paper className={classes.root} component='section' elevation={7}>
          <div className={classes.tableWrapper}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell 
                    className={classes.tabelCell}
                  >Имя
                  </StyledTableCell>
                  <StyledTableCell 
                    className={classes.tabelCell}
                  >Статус
                  </StyledTableCell>
                  {fields}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.search.length === 0 ? orders : search}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={props.search.length === 0 ? props.orders.length : props.search.length}
            rowsPerPage={state.pagination.rowsPerPage}
            page={state.pagination.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      }
      
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload,
    status: state.crater.payload,
    orders: state.orders.payload,
    search: state.search.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
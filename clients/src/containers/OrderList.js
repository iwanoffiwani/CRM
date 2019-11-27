import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
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
          {order.status}
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
      <Paper className={classes.root} component='section' elevation='7'>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <StyledTableCell 
                  className={classes.tabelCell}
                >
                  Имя
                </StyledTableCell>
                <StyledTableCell 
                  className={classes.tabelCell}
                >
                  Статус
                </StyledTableCell>
                {fields}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={props.orders.length}
          rowsPerPage={state.pagination.rowsPerPage}
          page={state.pagination.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload,
    statuses: state.crater.payload,
    orders: state.orders.payload
  }
}

export default connect(mapStateToProps)(OrderList)
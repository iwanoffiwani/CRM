import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import clsx from 'clsx'
import { fetchUpdateOrderList } from '../redux/actions'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import EditOrder from './EditOrder'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
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
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import green from '@material-ui/core/colors/green'

const editDrawerWitdth = `70%`

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const useStyles = makeStyles(theme => ({
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
  },
  fab: {
    width: 36,
    height: 36,
    marginTop: `-${theme.spacing(0.8)}px`,
    marginRight: theme.spacing(4)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  editDrawer: {
    width: editDrawerWitdth
  },
  editDrawerOpen: {
    width: editDrawerWitdth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  editDrawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0
  },
  editIcon: {
    width: '.8em',
    height: '.8em'
  }
}))

const OrderList = props => {
  const classes = useStyles()

  const initialState = {
    edit: {
      drawer: false,
      order: false
    },
    pagination: {
      page: 0,
      rowsPerPage: 10
    }
  }

  const [ state, setState ] = useState(initialState)

  const editHandler = order => {
    if (!state.edit.order) {
      return setState({
        ...state,
        edit: {
          order,
          drawer: true
        }
      })
    } else {
      return setState({
        ...state,
        edit: {
          order: false,
          drawer: false
        }
      })
    }
  }

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

  const otherFields = 
    props.fields.map(field => 
      <StyledTableCell
        key={field._id}
        align='right'
        className={classes.tabelCell}
      >{field.name}
      </StyledTableCell>
    )

  const otherStatuses = orderID => (
    props.status.map(item => 
      <MenuItem 
        id={item._id}
        key={item._id}
        value={item.name}
        data-order={orderID}
      >{item.name}
      </MenuItem>
    )
  )

  const otherOrderFields = fields => (
    fields.map(field => 
      <TableCell 
        key={field._id}
        align='right'
      >{field.value}
      </TableCell>
    )
  )

  const orders = orders => (
    orders.slice(
      state.pagination.page * state.pagination.rowsPerPage, 
      state.pagination.page * state.pagination.rowsPerPage + 
      state.pagination.rowsPerPage
    ).map(order => 
      <TableRow hover role='checkbox' tabIndex={-1} key={order._id}>
        <TableCell>
          <Fab 
            className={classes.fab} 
            size='small' 
            onClick={() => editHandler(order)}
          >
            <EditIcon 
              className={classes.editIcon}
              aria-label='edit' 
            />
          </Fab>
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
            }}
          >{otherStatuses(order._id)}
          </Select>
        </TableCell>
        {otherOrderFields(order.fields)}
      </TableRow>
    )
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
                  {otherFields}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.search.length === 0 ? orders(props.orders) : 
                orders(props.search)}
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
      <Drawer 
        open={state.edit.drawer}
        className={classes.editDrawer} 
        classes={{
          paper: clsx({
            [classes.editDrawerOpen]: state.edit.drawer,
            [classes.editDrawerClose]: !state.edit.drawer,
          }),
        }}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={editHandler}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <EditOrder 
          order={state.edit.order}
        />
      </Drawer>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload,
    status: state.status.payload,
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
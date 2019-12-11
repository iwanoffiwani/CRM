import React, { useState } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { editDrawerClose } from '../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import Preloader from '../../components/Preloader'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import TableFields from './TableFields'
import TableOrders from './TableOrders'
import TableOrderEdit from './TableOrderEdit'

const editDrawerWitdth = `75%`

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  wrapper: {
    maxHeight: 790,
    borderRadius: 4,
    overflow: 'auto',
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
  }
}))

const OrderTable = props => {
  const classes = useStyles()

  const initialState = { 
    pagination: {
      page: 0,
      rowsPerPage: 10
    }
  }

  const [ state, setState ] = useState(initialState)

  const editDrawerHandler = e => {
    if (props.edit.drawerOpen) 
      return props.drawerClose()
  }

  const changePageHandler = (e, page) => {
    return setState({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  }

  const changeRowsPerPageHandler = e => {
    return setState({
      ...state,
      pagination: {
        page: 0,
        rowsPerPage: +e.target.value
      }
    })
  }

  const tableOrders = () => {
    const orders = props.search.length === 0 ? props.orders : props.search

    const slice = {
      begin: state.pagination.page * state.pagination.rowsPerPage,
      end: state.pagination.page * state.pagination.rowsPerPage + state.pagination.rowsPerPage
    }

    // Обрезаем массив для пагинации и последующей передачи его компоненту
    return orders.slice(slice.begin, slice.end)
  }

  if (props.orders.length === 0) 
    return (
      <Preloader />
    )
  else 
    return (
      <Layout>
        <Paper className={classes.root} component='section' elevation={7}>
          <div className={classes.wrapper}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableFields />
              </TableHead>
              <TableBody>
                <TableOrders 
                  orders={tableOrders()}
                />
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={props.search.length === 0 ? props.orders.length : props.search.length}
            rowsPerPage={state.pagination.rowsPerPage}
            page={state.pagination.page}
            onChangePage={changePageHandler}
            onChangeRowsPerPage={changeRowsPerPageHandler}
          />
        </Paper>
        <Drawer 
          open={props.edit.drawerOpen} 
          className={clsx(classes.editDrawerOpen, {
            [classes.editDrawerOpen]: props.edit.drawerOpen,
            [classes.editDrawerClose]: !props.edit.drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.editDrawerOpen]: props.edit.drawerOpen,
              [classes.editDrawerClose]: !props.edit.drawerOpen,
            }),
          }}
          >
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={editDrawerHandler}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <TableOrderEdit />
        </Drawer>
      </Layout>
    )
}

const mapStateToProps = state => {
  return {
    edit: state.edit.payload,
    orders: state.orders.payload,
    search: state.search.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    drawerClose: () => dispatch(editDrawerClose())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable)
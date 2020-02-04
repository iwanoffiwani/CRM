import React, { useState } from 'react'
import PropTypes from 'prop-types' 
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchUpdateOrderList } from '../redux/actions'
import Preloader from '../components/Preloader'
import Layout from './Layout'
import clsx from 'clsx'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import EditOrder from './EditOrder'
import green from '@material-ui/core/colors/green'

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
  tabelCell: {
    minWidth: 60
  },
  fab: {
    width: 36,
    height: 36,
    marginTop: `-${theme.spacing(0.8)}px`,
    marginRight: theme.spacing(4)
  },
  editIcon: {
    width: '.8em',
    height: '.8em'
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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const mapStateToProps = state => {
  return {
    user: state.authorization.payload,
    columns: state.fields.payload,
    rows: state.orders.payload,
    search: state.search.payload,
    statuses: state.statuses.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  }
}

export const TableOrders = props => {

  const classes = useStyles()

  const initialState = {
    edit: {
      drawerOpen: false,
      order: false
    },
    pagination: {
      page: 0,
      rowsPerPage: 10
    }
  }

  const [ state, setState ] = useState(initialState)

  const changeStatusHandler = (e, order) => {
    const { 
      data: { 
        login: user 
      } 
    } = props.user // Получаем логин узера для записи в массив изменений

    const {
      _id: orderID,
      status: {
        name: prevStatus
      },
      changes
    } = order // Получаем id заявки, текущий статус заявки и массив изменений

    const {
      id: statusID
    } = e._targetInst.stateNode // Получаем id статуса

    const nextStatus = e.target.value 

    return axios({
        method: 'PATCH',
        url: '/api/orders/',
        params: {
          id: orderID 
        },
        data: {
          status: {
            _id: statusID,
            name: nextStatus // В модели перезапишется статус и _id. Это нужно для последующего редактирования
          },
          changes: [
            ...changes,
            {
              user,
              previousState: { // Свойство должно именоваться именно так, иначе будут серьезные проблемы
                status: prevStatus
              },
              nextState: {
                status: nextStatus
              }
            }
          ]
        },
      })
      .then(() => props.update())
  }

  const openEditDrawerHandler = order => {
    return setState({
      ...state,
      edit: {
        drawerOpen: true,
        order
      }
    })
  }

  const changePageHandler = (event, page)=> {
    return setState({
      ...state,
      pagination: {
        ...state.pagination,
        page
      }
    })
  }

  const changeRowsPerPagehHandler = e => {
    return setState({
      ...state,
      pagination: {
        ...initialState.pagination,
        rowsPerPage: +e.target.value
      }
    })
  }

  const disabledEditDrawerHandler = () => {
    return setState({
      ...state,
      edit: {
        ...initialState.edit
      }
    })
  }

  const otherColumns = 
    props.columns.map((column, index) => 
      <StyledTableCell
        key={index}
        align='right'
        className={classes.tabelCell}
      >{column.name}
      </StyledTableCell>
    )

  if (props.rows.length === 0) 
    return (
      <Preloader />
    )
  else 
    return (
      <Layout>
        <Paper className={classes.root} component='section' elevation={7}>
          <div className={classes.wrapper}>
            <Table>
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
                  {otherColumns}
                </TableRow>
              </TableHead>
              <TableBody>
                {(() => {
                  const { page, rowsPerPage } = state.pagination
                  const rows = props.search.length === 0 ? props.rows : props.search
                  
                  return (
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                          <TableCell>
                            <Fab 
                              className={classes.fab}
                              size='small'
                              onClick={() => openEditDrawerHandler(order)}
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
                              id='demo-simple-select-outlined'
                              value={order.status.name}
                              variant='outlined'
                              onChange={e => changeStatusHandler(e, order)}
                              fullWidth={true}
                            >{props.statuses.map((status, index) =>
                            <MenuItem 
                              id={status._id}
                              key={index} 
                              value={status.name}
                            >{status.name}</MenuItem>
                            )}
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
                    })
                  )
                })()}
              </TableBody>
            </Table>
          </div>
          <TablePagination 
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={props.search.length === 0 ? props.rows.length : props.search.length}
            rowsPerPage={state.pagination.rowsPerPage}
            page={state.pagination.page}
            onChangePage={changePageHandler}
            onChangeRowsPerPage={changeRowsPerPagehHandler}
          />
        </Paper>
        <Drawer 
          open={state.edit.drawerOpen}
          className={clsx(classes.editDrawerOpen, {
            [classes.editDrawerOpen]: state.edit.drawerOpen,
            [classes.editDrawerClose]: !state.edit.drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.editDrawerOpen]: state.edit.drawerOpen,
              [classes.editDrawerClose]: !state.edit.drawerOpen,
            }),
          }}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={disabledEditDrawerHandler}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <EditOrder 
            editOrder={state.edit.order}
          />
        </Drawer>
      </Layout>
    )
}

TableOrders.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders)
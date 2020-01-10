import React from 'react'
import { connect } from 'react-redux'
import { searchOrder } from '../redux/actions'
import { makeStyles, fade } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
}))

export const SearchBar = props => {

  const classes = useStyles()

  const format = str => str.toLowerCase().trim().replace(/[^A-Za-zА-Яа-яЁё\d]/g, "")

  const searchHandler = e => {
    const str = format(e.target.value)

    let result = []

    const names = props.orders.filter(order => format(order.name).indexOf(str) !== -1)

    if (names.length !== 0)
      result = names

    const statuses = props.orders.filter(order => format(order.status.name).indexOf(str) !== -1)

    if (statuses.length !== 0)
      result = statuses

    const fields = props.orders.filter(order => {
      for (let i = 0, len = order.fields.length - 1; i <= len; i++) 
        if (format(order.fields[i].value).indexOf(str) !== -1)
          return format(order.fields[i].value).indexOf(str) !== -1

      return false
    })

    if (fields.length !== 0)
      result = fields

    return props.result(result)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        name='search'
        onChange={searchHandler}
        placeholder='Поиск…'
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.orders.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    result: result => dispatch(searchOrder(result))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
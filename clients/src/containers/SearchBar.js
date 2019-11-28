import React, { useState } from 'react'
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

const SearchBar = props => {
  const classes = useStyles()

  const [ state, setState ] = useState('')

  const searchHandler = e => {
    const value = e.target.value.toLowerCase()
    const trim = value.trim()

    // Убераем из строки символы такие как пробелы, "-" и т.д. Оставляем буквы и цифры.
    // В методе .filter() будем использовать то же регулярное выражение.
    const replace = trim.replace(/[^A-Za-zА-Яа-яЁё\d]/g, "")

    // Сохраняем результат поиска в переменную
    let result = null

    const names = props.orders.filter(order => {
      const name = order.name.toLowerCase()
        .trim().replace(/[^A-Za-zА-Яа-яЁё\d]/g, "")

      return name.indexOf(replace) !== -1
    })

    if (names.length !== 0)
      result = names

    const statuses = props.orders.filter(order => {
      const status = order.status.toLowerCase()
        .trim().replace(/[^A-Za-zА-Яа-яЁё\d]/g, "")

      return status.indexOf(replace) !== -1
    })

    if (statuses.length !== 0)
      result = statuses

    const fields = props.orders.filter(order => {
      for (let i = 0, len = order.fields.length - 1; i <= len; i++) {
        const field = order.fields[i].value.toLowerCase()
          .trim().replace(/[^A-Za-zА-Яа-яЁё\d]/g, "")

        // Обязательная проверка условия, иначе  
        // метод возвращает первый результат
        if (field.indexOf(replace) !== -1) {
          return field.indexOf(replace) !== -1
        }
      }

      return false // Убираем варнинг, стрелочная функция ожидает return
    })

    if (fields.length !== 0)
      result = fields

    props.result(result)

    return setState(e.target.value)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        name='search'
        value={state}
        onChange={searchHandler}
        placeholder='Search…'
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
import React, { useState } from 'react'
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutCurrentUser } from '../redux/actions'
import clsx from 'clsx'
import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AddIcon from '@material-ui/icons/Add'
import CreateOrder from '../containers/CreateOrder'
import NavBar from './NavBar'
import SearchBar from '../containers/SearchBar'

const sidebarWidth = 240

const createOrderDrawerWidth = 540

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  sidebar: {
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  createOrderDrawer: {
    width: createOrderDrawerWidth
  },
  createOrderDrawerOpen: {
    width: createOrderDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  createOrderDrawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0
  },
  sidebarOpen: {
    width: sidebarWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sidebarClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
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
  addIcon: {
    marginRight: '.1em'
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
  },
  content: {
    flexGrow: 1,
    padding: '96px 1em 1em',
  },
}))

const Layout = props => {

  const classes = useStyles()
  
  const theme = useTheme()

  const [ createOrderDrawer, setcreateOrderDrawer ] = useState(false) 

  const [ sidebar, setSidebar ] = useState(false)

  const [ redirect, setRedirect ] = useState(false)

  const logoutHandler = e => {
    e.preventDefault()

    props.logoutUser({})
    return setRedirect(true)
  }

  const renderRedirect = () => {
    if (redirect) 
      return <Redirect 
        to={{
          pathname: '/auth'
        }}
      />
  }

  const handlecreateOrderDrawer = () => {
    if (createOrderDrawer === false) {
      setcreateOrderDrawer(true)
    } else {
      setcreateOrderDrawer(false)
    }
  }

  const handleSideBar = () => {
    if (sidebar === false) {
      return setSidebar(true)
    } else {
      return setSidebar(false)
    }
  }

  return (
    <div className={classes.root}>
      {renderRedirect()}
      <CssBaseline />
      <AppBar
        position='fixed'
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sidebar,
        })}>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleSideBar}
          className={clsx(classes.menuButton, {
            [classes.hide]: sidebar,
          })}>
          <MenuIcon />
        </IconButton>
        <Typography 
        className={classes.title} 
        variant='h6' 
        noWrap>
        </Typography>
        <Button 
          color='inherit' 
          onClick={handlecreateOrderDrawer}>
        <AddIcon 
          className={classes.addIcon}
        />Добавить</Button>
        <SearchBar />
        <Button 
          color='inherit' 
          onClick={logoutHandler}
        >Выйти</Button>
      </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.sidebar, {
          [classes.sidebarOpen]: sidebar,
          [classes.sidebarClose]: !sidebar,
        })}
        classes={{
          paper: clsx({
            [classes.sidebarOpen]: sidebar,
            [classes.sidebarClose]: !sidebar,
          }),
        }}
        open={sidebar}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={handleSideBar}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
          <NavBar />
        <Divider />
      </Drawer>
      <Drawer 
        open={createOrderDrawer}
        className={classes.createOrderDrawer} 
        classes={{
          paper: clsx({
            [classes.createOrderDrawerOpen]: createOrderDrawer,
            [classes.createOrderDrawerClose]: !createOrderDrawer,
          }),
        }}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={handlecreateOrderDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <CreateOrder />
      </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: state => dispatch(logoutCurrentUser(state))
  }
}

export default connect(null, mapDispatchToProps)(Layout)
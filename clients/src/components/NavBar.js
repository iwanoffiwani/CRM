import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import TimelineIcon from '@material-ui/icons/Timeline'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit'
  }
}))

const NavBar = () => { 

  const classes = useStyles()

  return ( 
    <nav className='navbar'>
      <List>
        <ListItem>
          <NavLink to='/' className={classes.link}>
            <ListItemIcon>
              <MailOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Задачи' />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/requires' className={classes.link}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary='Заявки' />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/analytics' className={classes.link}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary='Аналитика' />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/settings' className={classes.link}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Настройки' />
          </NavLink>
        </ListItem>
      </List>
    </nav>
  )
}

export default NavBar
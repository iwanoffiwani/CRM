import React from 'react'

import Fields from './Fields/'
import Statuses from './Statuses'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2em 0'
    // display: 'flex',
    // minHeight: '100vh'
  },
  box: {
    marginBottom: theme.spacing(4)
  },
  column: {
    flex: `1 0 50%`
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: '1.5em'
  }
}))

const Settings = props => {
  const classes = useStyles()

  return (
    <Container maxWidth='xl'>
      <div className={classes.root}>
        <Box className={classes.box}>
          <Typography 
            className={classes.title} 
            variant='h2' 
            noWrap>
            Редактирование полей
          </Typography>
          <Fields />
        </Box>
        <Box>
          <Typography 
            className={classes.title} 
            variant='h2' 
            noWrap>
            Редактирование статусов
          </Typography>
          <Statuses />
        </Box>
      </div>
    </Container>
  )
}

export default Settings
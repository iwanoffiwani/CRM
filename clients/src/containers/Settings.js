import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import EditFields from './EditFields'
import EditStatuses from './EditStatuses'

const useStyles = makeStyles(theme => ({
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

const mapStateToProps = state => {
  return {
    fields: state.fields.payload,
    statuses: state.statuses.payload
  }
}

export const Settings = props => {
  
  const classes = useStyles()
  
  return (
    <Layout>
      <div className={classes.root}>
        <Box className={classes.box}>
          <Typography 
            className={classes.title}
            variant='h2' 
            noWrap>
            Редактирование полей
          </Typography>
          <EditFields 
            fields={props.fields}
          />
        </Box>
        <Box>
          <Typography 
            className={classes.title} 
            variant='h2' 
            noWrap>
            Редактирование статусов
          </Typography>
          <EditStatuses 
            statuses={props.statuses}
          />
        </Box>
      </div>
    </Layout>
  )
}

Settings.propTypes = {
  fields: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Settings)
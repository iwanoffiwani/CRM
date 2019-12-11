import React from 'react'
import { connect } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
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
  tabelCell: {
    minWidth: 60
  }
})

const TableFields = props => {
  const classes = useStyles()

  const otherFields = 
    props.fields.map(field =>
      <StyledTableCell
        key={field._id}
        align='right'
        className={classes.tabelCell}
      >{field.name}
      </StyledTableCell>
    )

  return (
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
  )
}

const mapStateToProps = state => {
  return {
    fields: state.fields.payload
  }
}

export default connect(mapStateToProps)(TableFields)
import React from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './style'

const ErrorView = ({ error, classes }) => (
  <section>
    <h1 className={classes.heading}>Error :(</h1>

    <div className={classes.title}>
      <Text variant="title">Server Information</Text>
    </div>

    <Paper>
      <Table>
        <TableBody>
          {/** Server status code */}
          <TableRow>
            <TableCell component="th" scope="row">Status code</TableCell>
            <TableCell>{error.status}</TableCell>
          </TableRow>

          {/** Status */}
          <TableRow>
            <TableCell component="th" scope="row">Status</TableCell>
            <TableCell>{error.statusText}</TableCell>
          </TableRow>

          {/** Error message */}
          <TableRow>
            <TableCell component="th" scope="row">Error</TableCell>
            <TableCell>{error.message}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </section>
)

ErrorView.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number.isRequired,
    statusText: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ErrorView)

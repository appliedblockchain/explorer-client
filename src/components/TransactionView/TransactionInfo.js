import React from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { has } from 'lodash'
import moment from 'moment'
import { styles } from './style'

const TransactionInfo = ({ tx, classes }) => (
  <section className={classes.root}>
    <div className={classes.title}>
      <Text variant="title">Transaction Info</Text>
    </div>

    <Paper>
      <Table>
        <TableBody>
          {/** Tx Hash */}
          <TableRow>
            <TableCell component="th" scope="row">Hash</TableCell>
            <TableCell>
              <span className={classes.mono}>{tx.hash}</span>
            </TableCell>
          </TableRow>

          {/** From address */}
          <TableRow>
            <TableCell component="th" scope="row">From</TableCell>
            <TableCell>
              <span className={classes.mono}>{tx.from}</span>
            </TableCell>
          </TableRow>

          {/** To address */}
          <TableRow>
            <TableCell component="th" scope="row">
              {tx.to ? 'To' : 'Creates'}
            </TableCell>
            <TableCell>
              {tx.enhanced && <span>{tx.toName}{tx.to && '—'}</span>}
              <span className={classes.mono}>{tx.to}</span>
            </TableCell>
          </TableRow>

          {/** Block */}
          <TableRow>
            <TableCell component="th" scope="row">Block</TableCell>
            <TableCell>
              <Link className={classes.link} to={`/blocks/${tx.blockNumber}`}>
                {tx.blockNumber}
              </Link>
            </TableCell>
          </TableRow>

          {/** Timestamp */}
          {
            has(tx, 'timestamp') && (
              <TableRow>
                <TableCell component="th" scope="row">Timestamp</TableCell>
                <TableCell>
                  {moment(tx.timestamp * 1000).fromNow()} ( {moment(tx.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')} )
                </TableCell>
              </TableRow>
            )
          }

          {/** Gas Price */}
          <TableRow>
            <TableCell component="th" scope="row">Gas price</TableCell>
            <TableCell>{tx.gasPrice}</TableCell>
          </TableRow>

          {/** Gas Limit */}
          <TableRow>
            <TableCell component="th" scope="row">Gas limit</TableCell>
            <TableCell>{tx.gas}</TableCell>
          </TableRow>

          {/** Gas Used */}
          <TableRow>
            <TableCell component="th" scope="row">Gas used</TableCell>
            <TableCell>{tx.gasUsed}</TableCell>
          </TableRow>

          {/** Data */}
          <TableRow>
            <TableCell component="th" scope="row">Data</TableCell>
            <TableCell>
              <span className={classes.data}>{tx.input}</span>
            </TableCell>
          </TableRow>

          {/** Events */}
          <TableRow>
            <TableCell component="th" scope="row">Events</TableCell>
            <TableCell>{tx.logs.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </section>
)

TransactionInfo.propTypes = {
  tx: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TransactionInfo)

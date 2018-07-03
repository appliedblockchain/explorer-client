import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './style'

const BlockView = ({ info, classes }) => (
  <Fragment>
    {/** BLOCK INFORMATION */}
    <section className={classes.blockInfo}>
      <div className={classes.blockTitle}>
        <Text variant="title">
          Block #{info.number}
        </Text>
      </div>

      <Paper>
        <Table>
          <TableBody>
            {/** Block created */}
            <TableRow>
              <TableCell component="th" scope="row">Created</TableCell>
              <TableCell>
                {moment(info.timestamp * 1000).fromNow()} ( {moment(info.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')} )
              </TableCell>
            </TableRow>

            {/** Miner */}
            <TableRow>
              <TableCell component="th" scope="row">Miner</TableCell>
              <TableCell>
                <span className={classes.mono}>{info.miner}</span>
              </TableCell>
            </TableRow>

            {/** Parent Hash */}
            <TableRow>
              <TableCell component="th" scope="row">Parent Hash</TableCell>
              <TableCell>
                <span className={classes.mono}>{info.parentHash}</span>
              </TableCell>
            </TableRow>

            {/** Size */}
            <TableRow>
              <TableCell component="th" scope="row">Size</TableCell>
              <TableCell>{info.size}</TableCell>
            </TableRow>

            {/** Transaction count */}
            <TableRow>
              <TableCell component="th" scope="row">Transactions</TableCell>
              <TableCell>{info.transactions.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </section>

    {/** BLOCK TRANSACTIONS */}
    <section className={classes.blockInfo}>
      <div className={classes.blockTitle}>
        <Text variant="title">
          Transactions for Block #{info.number}
        </Text>
      </div>

      <Paper>
        <Table>
          <TableBody>
            {info.transactions.map(tx => (
              <TableRow key={tx}>
                <TableCell>
                  <Link className={classes.tx} to={`/transactions/${tx}`}>
                    {tx}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </section>
  </Fragment>
)

BlockView.propTypes = {
  info: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BlockView)

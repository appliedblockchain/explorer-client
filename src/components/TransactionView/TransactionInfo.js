import React from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const TransactionInfo = ({ tx }) => (
  <section className={style.root}>
    <div className={style.title}>
      <Text variant="title">Transaction Info</Text>
    </div>

    <Paper>
      <Table>
        <TableBody>
          {/** From address */}
          <TableRow>
            <TableCell component="th" scope="row">From</TableCell>
            <TableCell>
              <span className={style.mono}>{tx.from}</span>
            </TableCell>
          </TableRow>

          {/** To address */}
          <TableRow>
            <TableCell component="th" scope="row">To</TableCell>
            <TableCell>
              {tx.enhanced && <span>{tx.toName}—</span>}
              <span className={style.mono}>{tx.to}</span>
            </TableCell>
          </TableRow>

          {/** Block */}
          <TableRow>
            <TableCell component="th" scope="row">Block</TableCell>
            <TableCell>
              <Link className={style.link} to={`/blocks/${tx.blockNumber}`}>
                {tx.blockNumber}
              </Link>
            </TableCell>
          </TableRow>

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
              <span className={style.data}>{tx.input}</span>
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
  tx: PropTypes.object.isRequired
}

export default TransactionInfo

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isString } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import { styles } from './style'

/* :: object -> React.Node */
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

/* :: object[] -> boolean */
const isTxLoading = txs => txs.every(({ empty }) => empty)

/* :: object -> boolean */
const notEmpty = ({ empty }) => !empty

/* :: object -> React.Node */
const HomeView = ({ blocks, transactions, classes }) => (
  <Fragment>
    {/** Transactions */}
    <section className={classes.section}>
      <Text variant="title" className={classes.title}>
        Latest Transactions {isTxLoading(transactions) && '(syncing)'}
      </Text>

      {
        !isTxLoading(transactions) && (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Block</CustomTableCell>
                  <CustomTableCell style={{ paddingRight: 0, paddingLeft: 0 }}>
                  </CustomTableCell>
                  <CustomTableCell>Transaction</CustomTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {transactions.filter(notEmpty).map(tx => (
                  <TableRow className={classes.row} key={tx.hash}>
                    <CustomTableCell>
                      <Link className={classes.link} to={`/blocks/${tx.blockNumber}`}>
                        {tx.blockNumber}
                      </Link>
                    </CustomTableCell>

                    {/* Contract.method() */}
                    <CustomTableCell style={{ paddingRight: 0, paddingLeft: 0 }}>
                      {isString(tx.contract)
                        ? (
                          <span className={classes.contractName}>
                            {tx.contract}<span className={classes.contractMethod}>.{tx.method}()</span>
                          </span>
                        )
                        : ''
                      }
                    </CustomTableCell>
                    <CustomTableCell>
                      <Link className={classes.link} to={`/transactions/${tx.hash}`}>
                        <span className={classes.mono}>{tx.hash}</span>
                      </Link>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
      }
    </section>

    {/** Blocks */}
    <section className={classes.section}>
      <Text variant="title" className={classes.title}>Latest Blocks</Text>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Block</CustomTableCell>
              <CustomTableCell numeric>Transactions</CustomTableCell>
              <CustomTableCell>Validator</CustomTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blocks.map(b => (
              <TableRow className={classes.row} key={b.number}>
                <CustomTableCell>
                  <Link className={classes.link} to={`/blocks/${b.number}`}>
                    {b.number}
                  </Link>
                </CustomTableCell>
                <CustomTableCell numeric>{b.transactions.length}</CustomTableCell>
                <CustomTableCell>
                  <span className={classes.mono}>{b.miner}</span>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </section>
  </Fragment>
)

HomeView.propTypes = {
  blocks: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeView)

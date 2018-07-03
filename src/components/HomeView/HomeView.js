import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import LatestTransactions from './LatestTransactions'
import CustomTableCell from './CustomTableCell'
import { styles } from './style'

/* :: object -> React.Node */
const HomeView = ({ blocks, transactions, classes }) => (
  <Fragment>
    <LatestTransactions transactions={transactions} />

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

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import { styles } from './style'
import LatestTransactionsTable from './LatestTransactionsTable'

/* :: object[] -> boolean */
const isTxLoading = txs => txs.every(({ empty }) => empty)

const LatestTransactions = ({ classes, transactions }) => (
  <section className={classes.section}>
    <Text variant="title" className={classes.title}>
      Latest Transactions {isTxLoading(transactions) && '(syncing)'}
    </Text>

    {!isTxLoading(transactions) &&
      <LatestTransactionsTable transactions={transactions} />
    }
  </section>
)

LatestTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired
}

export default withStyles(styles)(LatestTransactions)

import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import LatestTransactionsTable from './LatestTransactionsTable'
import { styles } from './style'

const LatestTransactions = ({ transactions, synching, classes }) => (
  <section className={classes.section}>
    <Text variant="title" className={classes.title}>
      Latest Transactions {synching && '(synching)'}
    </Text>

    {!isEmpty(transactions) &&
      <LatestTransactionsTable transactions={transactions} />
    }
  </section>
)

LatestTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  synching: PropTypes.bool.isRequired
}

export default withStyles(styles)(LatestTransactions)

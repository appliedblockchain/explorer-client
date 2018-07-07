import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isInteger } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import LatestTransactions from './LatestTransactions'
import LatestBlocksTable from './LatestBlocksTable'
import { styles } from './style'

/* object -> boolean */
const exists = ({ number }) => isInteger(number)

/* :: object -> React.Node */
const HomeView = ({ blocks, transactions, classes }) => (
  <Fragment>
    {/** Transactions */}
    <LatestTransactions transactions={transactions} />

    {/** Blocks */}
    <section className={classes.section}>
      <Text variant="title" className={classes.title}>Latest Blocks</Text>
      <LatestBlocksTable blocks={blocks.filter(exists)} />
    </section>
  </Fragment>
)

HomeView.propTypes = {
  blocks: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeView)

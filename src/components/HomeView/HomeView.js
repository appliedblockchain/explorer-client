import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import LatestTransactions from './LatestTransactions'
import LatestBlocks from './LatestBlocks'

/* :: object -> React.Node */
const HomeView = ({
  blocks,
  blocksIsSynching,
  transactions,
  transactionsIsSynching
}) => (
  <Fragment>
    <LatestTransactions
      transactions={transactions}
      synching={transactionsIsSynching}
    />

    <LatestBlocks
      blocks={blocks}
      synching={blocksIsSynching}
    />
  </Fragment>
)

HomeView.propTypes = {
  blocks: PropTypes.array.isRequired,
  blocksIsSynching: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  transactionsIsSynching: PropTypes.bool.isRequired
}

export default HomeView

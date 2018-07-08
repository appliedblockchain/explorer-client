import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LatestBlocksTable from './LatestBlocksTable'
import { styles } from './style'

const LatestBlocks = ({ blocks, synching, classes }) => (
  <section className={classes.section}>
    <Text variant="title" className={classes.title}>
      Latest Blocks {synching && '(synching)'}
    </Text>

    {!isEmpty(blocks) && <LatestBlocksTable blocks={blocks} />}
  </section>
)

LatestBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
  synching: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LatestBlocks)

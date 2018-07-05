import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import * as api from '../../api'

/* :: number -> Promise<void> */
const timeout = ms => new Promise(r => void setTimeout(r, ms))

export const FOOTER_HEIGHT = 45

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  },
  info: {
    margin: '0 10px'
  }
}

class Footer extends Component {
  state = {
    info: null
  }

  componentDidMount() {
    this.getNetworkInfo()
  }

  async getNetworkInfo() {
    try {
      const info = await api.getNetworkInfo()
      this.setState({ info })
    } catch (e) {
      console.error(e)
      this.retry()
    }
  }

  async retry() {
    await timeout(10E3)
    this.getNetworkInfo()
  }

  render() {
    const { info } = this.state
    const { classes } = this.props

    return (
      <footer className={classes.root}>
        {info && (
          <Fragment>
            <Text variant="body2" className={classes.info}>Network ID: {info.networkId}</Text>
            <Text variant="body2" className={classes.info}>Connected peers: {info.peerCount}</Text>
          </Fragment>
        )}
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)

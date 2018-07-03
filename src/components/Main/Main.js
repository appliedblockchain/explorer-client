import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './style'

const Main = ({ className, children, classes }) => (
  <main className={`${classes.root} ${className}`}>
    {children}
  </main>
)

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
}

Main.defaultProps = {
  className: ''
}

export default withStyles(styles)(Main)

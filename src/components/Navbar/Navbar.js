import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import defaultLogo from './Logo'

export const createNavbar = (color = '#4396ec', Logo = defaultLogo) => {
  const styles = {
    appbar: {
      backgroundColor: color
    },
    toolbar: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }

  const Navbar = ({ classes }) => (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={styles.link}>
          <Logo />
        </Link>
      </Toolbar>
    </AppBar>
  )

  Navbar.propTypes = {
    classes: PropTypes.object.isRequired
  }

  withStyles(styles)(Navbar)
}

export default createNavbar()

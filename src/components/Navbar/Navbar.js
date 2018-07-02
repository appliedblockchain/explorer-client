import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import defaultLogo from './Logo'
import AppSearch from './AppSearch'

export const createNavbar = (color = '#4396ec', Logo = defaultLogo) => {
  const styles = {
    appbar: {
      backgroundColor: color
    },
    toolbar: {
      alignItems: 'center'
    },
    hamburger: {
      marginRight: 10
    },
    searchWrap: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }

  const Navbar = ({ classes, history }) => (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" className={classes.hamburger}>
          <MenuIcon />
        </IconButton>

        <Link to="/" className={styles.link}>
          <IconButton color="inherit">
            <Logo size={28} />
          </IconButton>
        </Link>

        <div className={classes.searchWrap}>
          <AppSearch history={history} />
        </div>
      </Toolbar>
    </AppBar>
  )

  Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  return withStyles(styles)(Navbar)
}

export default createNavbar()

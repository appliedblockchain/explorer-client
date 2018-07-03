import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Navbar, Main } from '../../components'
import { styles } from './style'

const NotFound = ({ history, classes }) => (
  <Fragment>
    <Navbar history={history} />
    <Main>
      <p className={classes._404}>404</p>
      <h1 className={classes.msg}>Page not Found :(</h1>
      <div className={classes.buttonWrap}>
        <Button
          className={classes.button}
          variant="fab"
          color="secondary"
          size="large"
          onClick={() => history.push('/')}
        >
          Home
        </Button>
      </div>
    </Main>
  </Fragment>
)

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFound)

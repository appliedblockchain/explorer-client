import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import * as api from '../../api'

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25)
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 840,
      '&:focus': {
        width: 920
      }
    }
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0,
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0
    }
  }
})

class AppSearch extends Component {
  state = {
    value: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const query = this.state.value.trim()
    this.setState({ value: '' })

    const { history } = this.props
    const { result } = await api.search(query)

    switch (result.type) {
      case 'block':
        history.push(`/blocks/${result.value}`)
        break
      case 'tx':
        history.push(`/transactions/${result.value}`)
        break
      default:
        history.push('/')
    }
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes.root}>
          <div className={classes.search}>
            <SearchIcon />
          </div>
          <input
            className={classes.input}
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </div>
      </form>
    )
  }
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withStyles(styles)(AppSearch)

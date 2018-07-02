import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import { isString } from 'lodash'
import { isUnprefixedHex, isPrefixedHex, prefixHex } from '@appliedblockchain/bdash'

/* any -> boolean */
const isTxHash = val => {
  if (!isString(val)) {
    return false
  }

  switch (val.length) {
    case 64:
      return isUnprefixedHex(val)
    case 66:
      return isPrefixedHex(val)
    default:
      return false
  }
}

/* string -> boolean */
const strIsInt = str => {
  const p = parseInt(str, 10)

  return !Number.isNaN(p) && String(p).length === str.length
}

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

  handleSubmit = (e) => {
    e.preventDefault()

    const { history } = this.props
    const value = this.state.value.trim()

    if (isTxHash(value)) {
      const txHash = isPrefixedHex(value) ? value : prefixHex(value)
      history.push(`/transactions/${txHash}`)
    } else if (strIsInt(value)) {
      history.push(`/blocks/${value}`)
    } else {
      alert('Search only supports block numbers and transaction hash\'s')
    }

    this.setState({ value: '' })
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

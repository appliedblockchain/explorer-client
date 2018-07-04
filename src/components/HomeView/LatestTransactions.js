import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isString, isInteger, isNumber } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import RootRef from '@material-ui/core/RootRef'
import TablePagination from '@material-ui/core/TablePagination'
import { Link } from 'react-router-dom'
import moment from 'moment'
import CustomTableCell from './CustomTableCell'
import { styles as commonStyles } from './style'

const MAIN_WIDTH = 920

/* :: object[] -> boolean */
const isTxLoading = txs => txs.every(({ empty }) => empty)

/* :: object -> boolean */
const notEmpty = ({ empty }) => !empty

/* :: object -> string */
const getTimestamp = ({ timestamp }) => {
  if (!isInteger(timestamp)) {
    return '––'
  }

  return moment(timestamp * 1000).fromNow()
}

class LatestTransactions extends Component {
  state = {
    heading1Width: null,
    heading2Width: null,
    rowsPerPage: 10,
    page: 0
  }

  componentDidMount() {
    /* eslint-disable */
    this.setState({
      heading1Width: this.heading1.current.offsetWidth,
      heading2Width: this.heading2.current.offsetWidth
    })
    /* eslint-enable */
  }

  heading1 = React.createRef()
  heading2 = React.createRef()

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { heading1Width, heading2Width, rowsPerPage, page } = this.state
    const { classes, transactions } = this.props
    const cellXPadding = 2 * 24

    /** To avoid horizontal scroll */
    const hashStyle = {
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: isNumber(heading1Width)
        ? MAIN_WIDTH - heading1Width - heading2Width - cellXPadding - 1
        : '100%'
    }

    const txs = transactions.filter(notEmpty)
    const displayTxs = txs.slice(
      page * rowsPerPage,
      (page * rowsPerPage) + rowsPerPage
    )

    return (
      <section className={classes.section}>
        <Text variant="title" className={classes.title}>
          Latest Transactions {isTxLoading(transactions) && '(syncing)'}
        </Text>

        {
          !isTxLoading(transactions) && (
            <Paper className={classes.root}>
              <Table>
                <TableHead>
                  <TableRow>
                    <RootRef rootRef={this.heading1}>
                      <CustomTableCell>Block</CustomTableCell>
                    </RootRef>
                    <RootRef rootRef={this.heading2}>
                      <CustomTableCell style={{ paddingRight: 0, paddingLeft: 0 }}>
                      </CustomTableCell>
                    </RootRef>
                    <CustomTableCell>Transaction</CustomTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {displayTxs.map(tx => (
                    <TableRow className={classes.row} key={tx.hash}>
                      <CustomTableCell>
                        <Tooltip title={getTimestamp(tx)}>
                          <Link className={classes.link} to={`/blocks/${tx.blockNumber}`}>
                            {tx.blockNumber}
                          </Link>
                        </Tooltip>
                      </CustomTableCell>

                      {/* Contract.method() */}
                      <CustomTableCell style={{ paddingRight: 0, paddingLeft: 0 }}>
                        {isString(tx.contract)
                          ? (
                            <span className={classes.contractName}>
                              {tx.contract}<span className={classes.contractMethod}>.{tx.method}()</span>
                            </span>
                          )
                          : ''
                        }
                      </CustomTableCell>
                      <CustomTableCell>
                        <Tooltip title={getTimestamp(tx)}>
                          <Link className={classes.link} to={`/transactions/${tx.hash}`}>
                            <span className={classes.mono} style={hashStyle}>{tx.hash}</span>
                          </Link>
                        </Tooltip>
                      </CustomTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={txs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          )
        }
      </section>
    )
  }
}

LatestTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired
}

export default withStyles(commonStyles)(LatestTransactions)

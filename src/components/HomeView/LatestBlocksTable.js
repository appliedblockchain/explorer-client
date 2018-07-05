import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import CustomTableCell from './CustomTableCell'
import { styles } from './style'

class LatestBlocksTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { page, rowsPerPage } = this.state
    const { blocks, classes } = this.props

    const displayBlocks = blocks.slice(
      page * rowsPerPage,
      (page * rowsPerPage) + rowsPerPage
    )

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Block</CustomTableCell>
              <CustomTableCell numeric>Transactions</CustomTableCell>
              <CustomTableCell>Validator</CustomTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayBlocks.map(b => (
              <TableRow className={classes.row} key={b.number}>
                <CustomTableCell>
                  <Link className={classes.link} to={`/blocks/${b.number}`}>
                    {b.number}
                  </Link>
                </CustomTableCell>
                <CustomTableCell numeric>{b.transactions.length}</CustomTableCell>
                <CustomTableCell>
                  <span className={classes.mono}>{b.miner}</span>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={blocks.length}
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
}

LatestBlocksTable.propTypes = {
  blocks: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LatestBlocksTable)

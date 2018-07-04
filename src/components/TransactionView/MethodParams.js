import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TableCell from './TableCell'
import { styles as commonStyles } from './style'

const styles = {
  ...commonStyles,
  table: {
    width: '100%',
    tableLayout: 'fixed'
  },
  param: {
    width: '15%'
  },
  paramValueWrap: {
    width: '70%',
    wordWrap: 'break-word'
  },
  paramValue: {
    display: 'block',
    width: '100%',
    maxHeight: '175px',
    overflow: 'auto'
  }
}

const MethodParams = ({ classes, tx }) => {
  if (!tx.enhanced) {
    return null
  }

  return (
    <section className={classes.root}>
      <div className={classes.title}>
        <Text variant="title">
          <span className={classes.methodName}>{tx.method}( )</span>
        </Text>
      </div>

      {
        !isEmpty(tx.params) && (
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.param}>Param</TableCell>
                  <TableCell className={classes.param}>Type</TableCell>
                  <TableCell className={classes.paramValueWrap}>Value</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tx.params.map(param => (
                  <TableRow key={param.name}>
                    <TableCell className={classes.param}>
                      {param.name}
                    </TableCell>
                    <TableCell className={classes.param}>
                      {param.type}
                    </TableCell>
                    <TableCell className={classes.paramValueWrap}>
                      <span className={classes.paramValue}>
                        {String(param.value)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
      }
    </section>
  )
}

MethodParams.propTypes = {
  tx: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MethodParams)

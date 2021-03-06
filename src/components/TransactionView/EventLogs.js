import React from 'react'
import PropTypes from 'prop-types'
import isString from 'lodash/isString'
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'
import ReactJson from 'react-json-view'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { withStyles } from '@material-ui/core/styles'
import CustomTableCell from './TableCell'

const styles = {
  root: {
    marginBottom: '3.5rem'
  },
  title: {
    marginBottom: '1rem'
  },
  table: {
    width: '100%',
    tableLayout: 'fixed'
  },
  medium: {
    width: '15%',
    overflow: 'hidden'
  },
  large: {
    width: '60%',
    overflow: 'hidden',
    wordWrap: 'break-word'
  },
  small: {
    width: '12.5%',
    overflow: 'hidden'
  },
  eventValue: {
    display: 'block',
    width: '100%',
    maxHeight: '150px',
    overflow: 'auto'
  }
}

const EventLogs = ({ classes, tx }) => {
  if (isEmpty(tx.logs)) {
    return null
  }

  return (
    <section className={classes.root}>
      <div className={classes.title}>
        <Text variant="title">Event Logs</Text>
      </div>

      {/** @NOTE: Events with params are expanded to show params table */}
      {tx.logs.map(({ id, data, topics, logIndex, name, params }, idx) => (
        <ExpansionPanel key={id} defaultExpanded={Array.isArray(params)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Text>{isString(name) ? `${name}( )` : `Event ${idx + 1}`}</Text>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            {isString(name) && Array.isArray(params)
              ? (
                <div style={{ width: '100%' }}>
                  <Paper>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.medium}>Param</TableCell>
                          <TableCell className={classes.small}>Type</TableCell>
                          <TableCell className={classes.small}>Indexed</TableCell>
                          <TableCell className={classes.large}>Value</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {params.map(param => (
                          <TableRow key={param.name}>
                            <CustomTableCell className={classes.medium}>
                              {param.name}
                            </CustomTableCell>
                            <CustomTableCell className={classes.small}>
                              {param.type}
                            </CustomTableCell>
                            <CustomTableCell className={classes.small}>
                              {capitalize(String(param.indexed))}
                            </CustomTableCell>
                            <CustomTableCell className={classes.large}>
                              <span className={classes.eventValue}>
                                {String(param.value)}
                              </span>
                            </CustomTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              )
              : <ReactJson src={{ id, data, topics, logIndex }} />
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </section>
  )
}

EventLogs.propTypes = {
  tx: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventLogs)

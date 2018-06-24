import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import MethodParams from './MethodParams'
import EventLogs from './EventLogs'
import TransactionInfo from './TransactionInfo'

const TransactionView = ({ info }) => (
  <Fragment>
    <TransactionInfo tx={info} />
    <MethodParams tx={info} />
    <EventLogs tx={info} />
  </Fragment>
)

TransactionView.propTypes = {
  info: PropTypes.object.isRequired
}

export default TransactionView

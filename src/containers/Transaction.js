import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isNull, isEmpty } from 'lodash'
import { unprefixHex } from '@appliedblockchain/bdash'
import { Main, Loading } from '../components'
import * as api from '../api'

/* :: Function -> Function */
export const createTransaction = (TransactionView, Navbar) => {
  class Transaction extends Component {
    state = {
      transaction: null
    }

    componentDidMount() {
      this.getTransaction()
    }

    componentDidUpdate() {
      this.getTransaction()
    }

    async getTransaction() {
      const { txhash } = this.props.match.params
      const transaction = await api.getTransaction(unprefixHex(txhash))

      /** Take them to 404 page when tx does not exist */
      if (isEmpty(transaction)) {
        this.props.history.push('/tx-not-found')
      }

      this.setState({ transaction })
    }

    render() {
      const { transaction } = this.state
      const { history } = this.props

      if (isNull(transaction)) {
        return <Loading navbar={Navbar} history={history} />
      }

      return (
        <Fragment>
          <Navbar history={history} />
          <Main>
            <TransactionView info={transaction} />
          </Main>
        </Fragment>
      )
    }
  }

  Transaction.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  return Transaction
}

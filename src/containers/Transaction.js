import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isNull, isEmpty, isObject } from 'lodash'
import { unprefixHex } from '@appliedblockchain/bdash'
import { Main, Loading, ErrorView } from '../components'
import * as api from '../api'

/* :: Function -> Function */
export const createTransaction = (TransactionView, Navbar) => {
  class Transaction extends Component {
    state = {
      transaction: null,
      error: null
    }

    componentDidMount() {
      this.getTransaction()
    }

    componentDidUpdate() {
      const { match } = this.props
      const { transaction: tx, error } = this.state

      if (!error && isObject(tx) && tx.hash !== match.params.txhash) {
        this.getTransaction()
      }
    }

    async getTransaction() {
      const { txhash } = this.props.match.params

      try {
        const transaction = await api.getTransaction(unprefixHex(txhash))

        /** Take them to 404 page when tx does not exist */
        if (isEmpty(transaction)) {
          this.props.history.push('/tx-not-found')
        }

        this.setState({ transaction })
      } catch (e) {
        const { status, statusText } = e.response
        const error = {
          status,
          statusText,
          message: e.response.data.error
        }

        this.setState({ error, transaction: {} })
      }
    }

    render() {
      const { transaction, error } = this.state
      const { history } = this.props

      if (isNull(transaction)) {
        return <Loading navbar={Navbar} history={history} />
      }

      return (
        <Fragment>
          <Navbar history={history} />
          <Main>
            {error
              ? <ErrorView error={error} />
              : <TransactionView info={transaction} />
            }
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

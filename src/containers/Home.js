import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import { Main, Loading, ErrorView } from '../components'
import * as api from '../api'

/* :: (Function, Function) -> Home */
export const createHome = (HomeView, Navbar) => {
  class Home extends Component {
    state = {
      blocks: null,
      blocksIsSynching: null,
      transactions: null,
      transactionsIsSynching: null,
      error: null
    }

    componentDidMount() {
      this.getData()
      this.polling = setInterval(this.pollLatestData.bind(this), 3000)
    }

    /**
     @NOTE: The function that is being executed in interval calls setState. Once
     the interval is cleared the function can run one more time calling setState
     on a unmounted component.
     */

    componentWillUnmount() {
      clearInterval(this.polling)

      this.setState = () => {}
    }

    isLoadingInitial() {
      const { blocks, transactions } = this.state

      return isNull(blocks) || isNull(transactions)
    }

    pollLatestData() {
      if (this.isLoadingInitial()) {
        return
      }

      this.getData()
    }

    /* Synching when blocks & Txs are not available */
    serverIsSynching() {
      const { blocksIsSynching, transactionsIsSynching } = this.state

      return !!blocksIsSynching && !!transactionsIsSynching
    }

    async getData() {
      try {
        const [
          blocks,
          transactions
        ] = await Promise.all([
          api.getLatestBlocks(100),
          api.getLatestTransactions(100)
        ])

        this.setState({
          blocks: blocks.blocks,
          blocksIsSynching: blocks.isSynching,
          transactions: transactions.transactions,
          transactionsIsSynching: transactions.isSynching,
          error: null
        })
      } catch (e) {
        const { status, statusText } = e.response

        if (this.isLoadingInitial()) {
          const error = {
            status,
            statusText,
            message: e.response.data.error
          }

          this.setState({ error, blocks: [], transactions: [] })
        }
      }
    }

    render() {
      const { history } = this.props
      const {
        blocks,
        blocksIsSynching,
        transactions,
        transactionsIsSynching,
        error
      } = this.state

      if (this.isLoadingInitial() || this.serverIsSynching()) {
        return <Loading navbar={Navbar} history={history} />
      }

      return (
        <Fragment>
          <Navbar history={history} />
          <Main>
            {error
              ? <ErrorView error={error} />
              : (
                <HomeView
                  blocks={blocks}
                  blocksIsSynching={blocksIsSynching}
                  transactions={transactions}
                  transactionsIsSynching={transactionsIsSynching}
                />
              )
            }
          </Main>
        </Fragment>
      )
    }
  }

  Home.propTypes = {
    history: PropTypes.object.isRequired
  }

  return Home
}

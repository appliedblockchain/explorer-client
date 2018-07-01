import React, { Component, Fragment } from 'react'
import isNull from 'lodash/isNull'
import { Main, Loading } from '../components'
import * as api from '../api'

/* :: (Function, Function) -> Home */
export const createHome = (HomeView, Navbar) => class Home extends Component {
  state = {
    blocks: null,
    transactions: null
  }

  componentDidMount() {
    this.getData()
    this.polling = setInterval(this.pollLatestData.bind(this), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.polling)
  }

  isLoading() {
    const { blocks, transactions } = this.state

    return isNull(blocks) || isNull(transactions)
  }

  pollLatestData() {
    if (this.isLoading()) {
      return
    }

    this.getData()
  }

  async getData() {
    const [
      blocks,
      transactions
    ] = await Promise.all([
      api.getLatestBlocks(),
      api.getLatestTransactions()
    ])

    this.setState({ blocks, transactions })
  }

  render() {
    const { blocks, transactions } = this.state

    if (this.isLoading()) {
      return <Loading navbar={Navbar} />
    }

    return (
      <Fragment>
        <Navbar />
        <Main>
          <HomeView blocks={blocks} transactions={transactions} />
        </Main>
      </Fragment>
    )
  }
}

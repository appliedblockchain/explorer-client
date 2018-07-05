import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import { Main, Loading } from '../components'
import * as api from '../api'

/* :: (Function, Function) -> Home */
export const createHome = (HomeView, Navbar) => {
  class Home extends Component {
    state = {
      blocks: null,
      transactions: null
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
        api.getLatestTransactions(100)
      ])

      this.setState({ blocks, transactions })
    }

    render() {
      const { history } = this.props
      const { blocks, transactions } = this.state

      if (this.isLoading()) {
        return <Loading navbar={Navbar} history={history} />
      }

      return (
        <Fragment>
          <Navbar history={history} />
          <Main>
            <HomeView blocks={blocks} transactions={transactions} />
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

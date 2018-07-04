import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isNull, isObject } from 'lodash'
import { Main, Loading } from '../components'
import * as api from '../api'

/* :: Function -> Function */
export const createBlock = (BlockView, Navbar) => {
  class Block extends Component {
    state = {
      block: null
    }

    componentDidMount() {
      this.getBlock()
    }

    componentDidUpdate() {
      const { block } = this.state

      if (isObject(block) && block.number !== this.getUrlBlockNumber()) {
        this.getBlock()
      }
    }

    getUrlBlockNumber() {
      return parseInt(this.props.match.params.number, 10)
    }

    async getBlock() {
      const blockNumber = this.getUrlBlockNumber()
      const block = await api.getBlock(blockNumber)

      /** Take them to the 404 page as block does not exist */
      if (isNull(block)) {
        this.props.history.push('/block-not-found')
      }

      this.setState({ block })
    }

    render() {
      const { block } = this.state
      const { history } = this.props

      if (isNull(block)) {
        return <Loading navbar={Navbar} history={history} />
      }

      return (
        <Fragment>
          <Navbar history={history} />
          <Main>
            <BlockView info={block} />
          </Main>
        </Fragment>
      )
    }
  }

  Block.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  return Block
}

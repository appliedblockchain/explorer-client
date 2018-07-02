import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createHome } from './containers/Home'
import { createBlock } from './containers/Block'
import { createTransaction } from './containers/Transaction'
import { HomeView, BlockView, TransactionView, Navbar } from './components'

/* :: object -> Function */
export const createApp = ({
  homepage = HomeView,
  blockPage = BlockView,
  transactionPage = TransactionView,
  navbar = Navbar
} = {}) => {
  const Home = createHome(homepage, navbar)
  const Block = createBlock(blockPage, navbar)
  const Transaction = createTransaction(transactionPage, navbar)

  const App = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blocks/:number" component={Block} />
        <Route exact path="/transactions/:txhash" component={Transaction} />
        <Route render={() => <p>Not Found :(</p>} />
      </Switch>
    </Router>
  )

  return App
}

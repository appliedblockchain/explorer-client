import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { createHome } from './containers/Home'
import { createBlock } from './containers/Block'
import { createTransaction } from './containers/Transaction'
import { HomeView, BlockView, TransactionView, Navbar } from './components'

const styles = {
  '@global': {
    '*': {
      boxSizing: 'inherit',
      '&::before': { boxSizing: 'inherit' },
      '&::after': { boxSizing: 'inherit' }
    },
    html: {
      boxSizing: 'border-box',
      fontSize: '16px'
    },
    body: {
      position: 'relative',
      minWidth: '320px',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      background: '#fafafa',
      '-webkit-font-smoothing': 'antialiased'
    }
  }
}

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

  return withStyles(styles)(App)
}

import React from 'react'
import ReactDOM from 'react-dom'
import { createApp } from './lib'
import './index.css'

/**
 @NOTE: This file is for development
 */

const App = createApp()

ReactDOM.render(<App />, document.getElementById('root'))

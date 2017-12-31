import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Menu from './common/Menu'
import Portfolio from './Portfolio'
import About from './About'
import CV from './CV'
import 'normalize.css'

const App = () => (
  <Router>
    <div>
      <Route path='/' component={Menu} />
      <Route path='/portfolio' component={Portfolio} />
      <Route path='/cv' component={CV} />
      <Route path='/about' component={About} />
    </div>
  </Router>
)

export default App

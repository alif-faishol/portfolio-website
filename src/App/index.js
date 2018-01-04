import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Menu from './Menu'
import Portfolio from './Portfolio'
import About from './About'
import CV from './CV'
import 'normalize.css'
import MainRouteContainer from './common/MainRouteContainer'
import styled, {injectGlobal} from 'styled-components'
import color from './common/themes'

injectGlobal([`
  html {
    background-color: ${color('light').B}
  }
`])

const PageContainer = styled.div`
  z-index: 50;
  position: relative;
  padding-top: 100px;
`

const App = () => (
  <Router>
    <div>
      <Route path='/' component={Menu} />
      <PageContainer>
        <Route
          path='/portfolio'
          render={props =>
              <MainRouteContainer {...props} children={Portfolio}/>
          }
        />
        <Route
          path='/cv'
          render={props =>
              <MainRouteContainer {...props} children={CV}/>
          }
        />
        <Route
          path='/about'
          render={props =>
              <MainRouteContainer {...props} children={About}/>
          }
        />
      </PageContainer>
    </div>
  </Router>
)

export default App

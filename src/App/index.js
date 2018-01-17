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
import store from 'redux/store'

injectGlobal([`
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,600,700|Overlock:400,400i,700,700i');
  html {
    background-color: ${color(store.getState().main.colorscheme).contentBG};
  }
  * {
    font-family: 'Josefin Sans', sans-serif;
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

import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Menu from './Menu'
import Portfolio from './Portfolio'
import About from './About'
import CV from './CV'
import 'normalize.css'
import {connect} from 'react-redux'
import MainRouteContainer from './common/MainRouteContainer'
import styled from 'styled-components'

const globalStyle = backgroundColor => (`
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,600,700|Overlock:400,400i,700,700i');
  html {
    background-color: ${backgroundColor};
  }
  * {
    font-family: 'Josefin Sans', sans-serif;
  }
`)

const PageContainer = styled.div`
  z-index: 50;
  position: relative;
  padding-top: 100px;
`

const App = props => (
  <Router>
    <div>
      <style>
        {globalStyle(props.colorscheme.contentBG)}
      </style>
      <Route path='/' component={Menu} />
      <PageContainer>
        <Route
          exact
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

export default connect(
  ({main}) => ({
    colorscheme: main.colorscheme
  })
)(App)

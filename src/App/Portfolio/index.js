import React from 'react'
import {Route} from 'react-router-dom'

const Portfolio = props => (
  <div>
    <h1>This is Portfolio page</h1>
        <p style={{fontSize: '100px'}}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
          vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem
        </p>
    <Route
      path='/portfolio/test'
      component={
        () => (
          <p>horee</p>
        )
      }
    />
  </div>
)

export default Portfolio

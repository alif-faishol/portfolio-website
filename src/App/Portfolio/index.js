import React from 'react'
import {Route} from 'react-router-dom'
import api from '../../apiHandler'

class Portfolio extends React.Component {
  componentDidMount() {
    api.getPortfolioItems().then(res => console.log(res)).catch(err => console.log(err))
  }
  render() {
    return (
      <div>
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
  }
}

export default Portfolio

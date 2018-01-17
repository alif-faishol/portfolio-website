import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {valuePasser} from 'action'
import api from 'apiHandler'

class Portfolio extends React.Component {
  componentDidMount() {
    api.getPortfolioItems()
      .then(res => this.props.getData(res))
      .catch(err => console.log(err))
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

export default connect(
  ({portfolio}) => ({
    data: portfolio.data
  }),
  dispatch => ({
    getData: data => dispatch(valuePasser(data))
  })
)(Portfolio)

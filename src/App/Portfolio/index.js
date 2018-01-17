import React from 'react'
import {connect} from 'react-redux'
import {loadData, toggleLoading} from 'redux/modules/portfolio'
import api from 'apiHandler'
import styled from 'styled-components'
import PortfolioItem from 'App/Portfolio/PortfolioItem'

const PortfolioItemsContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`

class Portfolio extends React.Component {
  componentDidMount() {
    api.getPortfolioItems()
      .then(res => {
        this.props.getData(res)
        this.props.dataIsLoadingToggle(false)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <PortfolioItemsContainer>
        {this.props.dataIsLoading
            ? (<div>Loading</div>)
            : this.props.data.map(item => (
              <PortfolioItem
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                images={item.images}
              />
            ))
        }
      </PortfolioItemsContainer>
    )
  }
}

export default connect(
  ({portfolio}) => ({
    data: portfolio.data,
    dataIsLoading: portfolio.dataIsLoading
  }),
  dispatch => ({
    getData: data => dispatch(loadData(data)),
    dataIsLoadingToggle: forceTo => dispatch(toggleLoading(forceTo))
  })
)(Portfolio)

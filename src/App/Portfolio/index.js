import React from 'react'
import {connect} from 'react-redux'
import {loadData} from 'redux/modules/portfolio'
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
        this.props.loadData(res)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <PortfolioItemsContainer>
        {this.props.data[0]
            ? this.props.data.map(item => (
              <PortfolioItem
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                images={item.images}
              />
            ))
            : (<div>Loading</div>)
        }
      </PortfolioItemsContainer>
    )
  }
}

export default connect(
  ({portfolio}) => ({
    data: portfolio.data,
  }),
  dispatch => ({
    loadData: data => dispatch(loadData(data)),
  })
)(Portfolio)

import React from 'react'
import {connect} from 'react-redux'
import {loadData} from 'redux/modules/portfolio'
import api from 'apiHandler'
import styled from 'styled-components'
import PortfolioItem from 'App/Portfolio/PortfolioItem'
import Paginator from 'App/common/Paginator'

const PortfolioItemsContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
`

class Portfolio extends React.Component {
  componentDidMount() {
    api.getPortfolioItems()
      .then(res => {
        this.props.loadData(res)
      })
      .catch(err => console.log(err))
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params !== nextProps.match.params) {
      api.getPortfolioItems()
        .then(res => {
          nextProps.loadData(res)
        })
        .catch(err => console.log(err))
    }
  }
  render() {
    return (
      <div>
        {(this.props.items.data
          && this.props.items.data[0])
            ? (
              <div>
                <PortfolioItemsContainer>
                  {this.props.items.data.map(item => (
                    <PortfolioItem
                      key={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      images={item.images}
                    />
                  ))}
                </PortfolioItemsContainer>
                <Paginator
                  pages={4}
                  active={1}
                />
              </div>
            )
            : (<div>Loading</div>)
        }
      </div>
    )
  }
}

export default connect(
  ({main, portfolio}) => ({
    items: portfolio.items
  }),
  dispatch => ({
    loadData: data => dispatch(loadData(data)),
  })
)(Portfolio)

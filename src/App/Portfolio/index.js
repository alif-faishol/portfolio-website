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
    api.getPortfolioItems({
      page:this.props.match.params.page ? this.props.match.params.page : 1
    })
      .then(res => {
        this.props.loadData(res)
      })
      .catch(err => console.log(err))
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params !== nextProps.match.params) {
      api.getPortfolioItems({
        page:nextProps.match.params.page ? nextProps.match.params.page : 1
      })
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
                  totalPage={this.props.items.meta.totalPage}
                  activePage={this.props.match.params.page || 1}
                  baseUrl={'/portfolio/'}
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

import React from 'react'
import {connect} from 'react-redux'
import {loadData, toggleLoading} from 'redux/modules/portfolio'
import api from 'apiHandler'
import styled from 'styled-components'
import PortfolioItem from 'App/Portfolio/PortfolioItem'
import Loading from 'App/common/animation/Loading'
import Paginator from 'App/common/Paginator'

const PortfolioItemsContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
`

const Centered = styled.div`
  margin-top: ${props => props.viewportSize.height/2-100-50}px;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Portfolio extends React.Component {
  componentDidMount() {
    console.log("didMount")
    api.getPortfolioItems({
      page:this.props.match.params.page ? this.props.match.params.page : 1
    })
      .then(res => {
        this.props.loadData(res)
        this.props.toggleLoading(false)
      })
      .catch(err => console.log(err))
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params !== nextProps.match.params) {
    console.log("receiveProps")
      this.props.toggleLoading(true)
      api.getPortfolioItems({
        page:nextProps.match.params.page ? nextProps.match.params.page : 1
      })
        .then(res => {
          nextProps.loadData(res)
          this.props.toggleLoading(false)
        })
        .catch(err => console.log(err))
    }
  }
  componentWillUnmount() {
    this.props.toggleLoading(true)
  }
  render() {
    return (
      (this.props.loading
        ? (
          <Centered viewportSize={this.props.viewportSize}>
            <Loading/>
          </Centered>
        )
        : (
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
      )
    )
  }
}

export default connect(
  ({main, portfolio}) => ({
    viewportSize: main.viewportSize,
    items: portfolio.items,
    loading: portfolio.loading
  }),
  dispatch => ({
    loadData: data => dispatch(loadData(data)),
    toggleLoading: state => dispatch(toggleLoading(state))
  })
)(Portfolio)

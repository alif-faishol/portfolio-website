import React from 'react'
import {connect} from 'react-redux'
import {
  loadData,
  toggleLoading,
  toggleDetailsData,
  loadDetailsData
} from 'redux/modules/portfolio'
import {confDynamicMenu, confTitle} from 'redux/modules/menu'
import api from 'apiHandler'
import styled from 'styled-components'
import PortfolioItem from 'App/Portfolio/PortfolioItem'
import Loading from 'App/common/animation/Loading'
import Paginator from 'App/common/Paginator'
import ItemDetails from 'App/Portfolio/ItemDetails'
import {DynamicMenuBtn, DynamicMenuContent} from 'App/Portfolio/DynamicMenu'

const PortfolioItemsContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
`

const Centered = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
`

class Portfolio extends React.Component {
  componentDidMount() {
    api.getPortfolioItems({
      page: this.props.match.params.page ? this.props.match.params.page : 1
    })
      .then(res => {
        this.props.loadData(res)
        this.props.toggleLoading(false)
      })
      .catch(err => console.log(err))

    this.props.confTitle("Portfolio")

    this.props.confDynamicMenu({
      title: "Apply filter:",
      button: <DynamicMenuBtn/>,
      content: <DynamicMenuContent/>,
    })
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.filter !== nextProps.filter) {
      this.props.history.push('/portfolio')
    }
    if(this.props.match.params !== nextProps.match.params) {
      this.props.toggleLoading(true)
      api.getPortfolioItems({
        page: nextProps.match.params.page ? nextProps.match.params.page : 1,
        filter: nextProps.filter
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
    this.props.confDynamicMenu()
    this.props.confTitle()
  }
  render() {
    return (
      (this.props.loading
        ? (
          <Centered>
            <Loading/>
          </Centered>
        )
        : (
          <div>
            <ItemDetails/>
            <PortfolioItemsContainer>
              {this.props.items.data.map(item => (
                <PortfolioItem
                  key={item.id}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  images={item.images}
                  category={item.category}
                  onClick={() => {
                    this.props.toggleDetailsData(true)
                    this.props.loadDetailsData(item)
                  }}
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
    items: portfolio.items,
    filter: portfolio.filter,
    loading: portfolio.loading
  }),
  dispatch => ({
    loadData: data => dispatch(loadData(data)),
    toggleLoading: state => dispatch(toggleLoading(state)),
    confTitle: title => dispatch(confTitle(title)),
    confDynamicMenu: conf => dispatch(confDynamicMenu(conf)),
    toggleDetailsData: state => dispatch(toggleDetailsData(state)),
    loadDetailsData: data => dispatch(loadDetailsData(data))
  })
)(Portfolio)

import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import {loadData, toggleLoading, changeFilter} from 'redux/modules/portfolio'
import {confDynamicMenu, confTitle} from 'redux/modules/menu'
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

const DynamicMenuBtn = () => (
  <div
    style={{
      padding: '8px 8px 4px 8px',
      borderRadius: '5px',
      color: 'white',
      backgroundColor: 'black',
    }}
  >
    Filter
  </div>
)

const DynamicMenuContent = props => {

  const Checkbox = connect(
    ({portfolio}) => ({
      filter: portfolio.filter
    }),
    dispatch => ({
      changeFilter: filter => dispatch(changeFilter(filter))
    })
  )(props => {
    const changeHandler = event => {
      props.changeFilter({
        [props.id]: event.target.checked
      })
    }
    return (
      <label>
        {props.name}
        <input
          name={props.id}
          type='checkbox'
          checked={
            props.filter[props.id] || props.filter[props.id] === undefined
              ? true
              : false
          }
          onChange={changeHandler}
        />
      </label>
    )
  })

  const Submit = withRouter(({history}) => (
        <button
          onClick={history.push('/portfolio/?filter=')}
        >
          haha
        </button>
      ))

  return (
    <div>
      <Checkbox name="Motion Graphics" id={1}/>
      <Checkbox name="Design Graphics" id={2}/>
      <Checkbox name="Web Development" id={3}/>
      <Submit/>
    </div>
  )
}

class Portfolio extends React.Component {
  componentDidMount() {
    api.getPortfolioItems({
      page:this.props.match.params.page ? this.props.match.params.page : 1
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
    if(this.props.match.params !== nextProps.match.params) {
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
    this.props.confDynamicMenu()
    this.props.confTitle()
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
    toggleLoading: state => dispatch(toggleLoading(state)),
    confTitle: title => dispatch(confTitle(title)),
    confDynamicMenu: conf => dispatch(confDynamicMenu(conf))
  })
)(Portfolio)

import React from 'react'
import {connect} from 'react-redux'
import {toggleMenu} from 'redux/modules/menu'
import ContentContainer from './styles/ContentContainer'
import Loading from 'App/common/animation/Loading'
import styled from 'styled-components'

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

class MainRouteContainer extends React.Component {
  componentDidMount() {
    this.props.menuExpanded && this.props.toggleMenu(false)
  }
  render() {
    return this.props.menuContent === "home" 
      && (
        this.props.onTransition || this.props.menuExpanded
      )
      ? (<Centered viewportSize={this.props.viewportSize}>
        <Loading/>
      </Centered>)
      : (
        <ContentContainer>
          <this.props.children {...this.props}/>
        </ContentContainer>)
  }
}

export default connect(
  ({main, menu}) => ({
    viewportSize: main.viewportSize,
    menuExpanded: menu.menuExpanded,
    menuContent: menu.menuContent,
    onTransition: main.onTransition
  }),
  dispatch => ({
    toggleMenu: (toBe) => {
      dispatch(toggleMenu(toBe))
    }
  })
)(MainRouteContainer)

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

const MainRouteContainer = props => (
  props.onTransition && !props.menuExpanded
  ? (<Centered viewportSize={props.viewportSize}>
    <Loading/>
  </Centered>)
  : (
    <ContentContainer>
      <props.children {...props}/>
    </ContentContainer>)
)

export default connect(
  ({main, menu}) => ({
    viewportSize: main.viewportSize,
    menuExpanded: menu.menuExpanded,
    onTransition: main.onTransition
  }),
  dispatch => ({
    toggleMenu: (toBe) => {
      dispatch(toggleMenu(toBe))
    }
  })
)(MainRouteContainer)

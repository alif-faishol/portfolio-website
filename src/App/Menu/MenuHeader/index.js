import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {toggleMenu} from 'redux/modules/menu'
import {changeMenuContent} from 'redux/modules/menu'

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  font-size: 20px;
  align-items: center;
`

const BackBtn = styled(Link)`
  height: 50px;
  width: 30%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  text-decoration: none;
`

const LogoAF = styled.div`
  height: 50px;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    display: none;
  }
`

const MenuToggleBtn = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  text-align: right;
  width: 30%;
`
const ClosedMenu = props => (
  <RootContainer>
    <BackBtn
      to='/'
      onClick={() => {
        props.changeMenuContent("home")
        props.toggleMenu(true)
      }}
    >
      HOME
    </BackBtn>
    <LogoAF innerRef={ref => {this.LogoAF = ref}}>
      {props.notHome ? "Alif Faishol" : "- - -"}
    </LogoAF>
    <MenuToggleBtn
      onClick={() => {
        props.changeMenuContent("navigation")
        props.toggleMenu()
      }}
    >
      MENU
    </MenuToggleBtn>
  </RootContainer>
)


export default connect(null,
  dispatch => ({
    toggleMenu: () => {
      dispatch(toggleMenu())
    },
    changeMenuContent: (content) => {
      dispatch(changeMenuContent(content))
    }
  })
)(ClosedMenu)

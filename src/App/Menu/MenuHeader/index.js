import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {toggleMenu} from '../../../action'

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
class ClosedMenu extends React.Component {
  render() {
    return !this.props.root &&
      (
        <RootContainer>
          <BackBtn to='/' onClick={() => {this.props.toggleMenu(true)}}>
            HOME
          </BackBtn>
          <LogoAF innerRef={ref => {this.LogoAF = ref}}>
            Alif Faishol
          </LogoAF>
          <MenuToggleBtn
            onClick={this.props.toggleMenu}
          >
            MENU
          </MenuToggleBtn>
        </RootContainer>
      )
  }
}

export default connect(null,
  dispatch => ({
    toggleMenu: () => {
      dispatch(toggleMenu())
    }
  })
)(ClosedMenu)

import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const RootContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-height: ${props => props.viewportsize.height}px;
`

const Logo = styled.div`
  flex: 5 0 200px;
  display: flex;
  font-size: 50px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  & .small {
    margin-top: 5px;
    color: rgb(120, 120, 120);
    font-size: 13px;
  }
`

const MenuContainer = styled.div`
  display: flex; 
  flex: 2 0 200px;
`

const Menus = styled(Link)`
  flex: 1 0 0;
  background-color: ${props => props.bgc};
`

const MenuHome = props => (
  <RootContainer viewportsize={props.viewportsize}>
    <Logo>
      <div>
        Alif Faishol
      </div>
        <div className='small'>WEB DEVELOPER & GRAPHIC DESIGNER</div>
    </Logo>
    <MenuContainer>
      <Menus to='/cv' bgc="blue" />
      <Menus to='/portfolio' bgc="red" />
      <Menus to='/about' bgc="green" />
    </MenuContainer>
  </RootContainer>
)

export default connect(
  ({main}) => ({
    viewportsize: main.viewportSize
  })
)(MenuHome)

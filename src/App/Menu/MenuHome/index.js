import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PortfolioIcon from './portfolio-icon-svg'
import CVIcon from './cv-icon-svg'
import AboutIcon from './about-icon-svg'

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  text-decoration: none;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
  & svg {
    fill: ${props => props.bgc};
    width: 40px;
  }
  & div {
    text-transform: uppercase;
    color: rgb(120, 120, 120);
    font-size: 13px;
    margin-top: 20px;
  }
`

const MenuHome = props => (
  <RootContainer viewportsize={props.viewportsize}>
    <Logo>
      <div>
        Alif Faishol
      </div>
      <div className='small'>WEB DEVELOPER &amp; GRAPHIC DESIGNER</div>
    </Logo>
    <MenuContainer>
      <Menus to='/portfolio' bgc={props.colorscheme.b}>
        <PortfolioIcon/>
        <div>Portfolio</div>
      </Menus>
      <Menus to='/cv' bgc={props.colorscheme.a}>
        <CVIcon/>
        <div>CV</div>
      </Menus>
      <Menus to='/about' bgc={props.colorscheme.c}>
        <AboutIcon/>
        <div>About</div>
      </Menus>
    </MenuContainer>
  </RootContainer>
)

export default connect(
  ({main}) => ({
    viewportsize: main.viewportSize,
    colorscheme: main.colorscheme
  })
)(MenuHome)

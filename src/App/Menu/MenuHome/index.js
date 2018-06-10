import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleMenu} from 'redux/modules/menu'
import PortfolioIcon from './portfolio-icon-svg'
import CVIcon from './cv-icon-svg'
import AboutIcon from './about-icon-svg'

const RootContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-height: ${props => props.viewportsize.height}px;
`

const Logo = styled.div`
  flex: 9 0 200px;
  display: flex;
  font-size: 50px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  & .small {
    margin-top: 5px;
    color: rgb(120, 120, 120);
    font-size: 13px;
    line-height: 25px;
  }
`

const Menu = styled(Link)`
  flex: 0 1 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  text-decoration: none;
  & svg {
    fill: ${props => props.color};
    width: 20%;
  }
  & div {
    text-transform: uppercase;
    color: rgb(120, 120, 120);
    font-size: 13px;
    margin-top: 20px;
  }
  @media screen and (max-width: 640px) {
    flex: 0 1 100px;
    height: 100px;
    & svg {
      width: 30%;
    }
    & div {
      font-size: 12px;
    }
  }
`

const MenuContainer = styled.div`
  display: flex; 
  flex: 1 0 auto;
  justify-content: space-around;
  & ${Menu}:hover {
    background-color: ${props => props.hoverColor};
  }
`

const MenuHome = props => (
  <RootContainer
    viewportsize={props.viewportsize}
  >
    <Logo>
      <div>
        Alif Faishol
      </div>
      <div className='small'>WEB DEVELOPER &amp; GRAPHIC DESIGNER</div>
    </Logo>
    <MenuContainer hoverColor={props.colorscheme.highlight}>
      <Menu
        to='/portfolio'
        color={props.colorscheme.accent2}
        onClick={() => props.toggleMenu(false)}
      >
        <PortfolioIcon/>
        <div>Portfolio</div>
      </Menu>
      <Menu
        to='/cv'
        color={props.colorscheme.accent1}
        onClick={() => props.toggleMenu(false)}
      >
        <CVIcon/>
        <div>CV</div>
      </Menu>
      <Menu
        to='/about'
        color={props.colorscheme.accent3}
        onClick={() => props.toggleMenu(false)}
      >
        <AboutIcon/>
        <div>About</div>
      </Menu>
    </MenuContainer>
  </RootContainer>
)

export default connect(
  ({main}) => ({
    viewportsize: main.viewportSize,
    colorscheme: main.colorscheme
  }),
  dispatch => ({
    toggleMenu: status => dispatch(toggleMenu(status))
  })
)(MenuHome)

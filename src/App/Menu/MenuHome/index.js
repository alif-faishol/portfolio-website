import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMenu } from 'redux/modules/menu';
import PortfolioIcon from './portfolio-icon-svg';
import CVIcon from './cv-icon-svg';
import AboutIcon from './about-icon-svg';

const RootContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

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
`;

const Menu = styled(Link)`
  flex: 0 1 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  text-decoration: none;
  & svg {
    fill: ${({ color }) => color};
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
`;

const MenuContainer = styled.div`
  display: flex; 
  flex: 1 0 auto;
  justify-content: space-around;
  & ${Menu}:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

const MenuHome = ({ viewportSize, colorscheme, _toggleMenu }) => (
  <RootContainer
    style={{
      minHeight: viewportSize.height,
    }}
  >
    <Logo>
      <div>
        Alif Faishol
      </div>
      <div className="small">
        WEB DEVELOPER &amp; GRAPHIC DESIGNER
      </div>
    </Logo>
    <MenuContainer hoverColor={colorscheme.highlight}>
      <Menu
        to="/portfolio"
        color={colorscheme.accent2}
        onClick={() => _toggleMenu(false)}
      >
        <PortfolioIcon />
        <div>
          Portfolio
        </div>
      </Menu>
      <Menu
        to="/cv"
        color={colorscheme.accent1}
        onClick={() => _toggleMenu(false)}
      >
        <CVIcon />
        <div>
          CV
        </div>
      </Menu>
      <Menu
        to="/about"
        color={colorscheme.accent3}
        onClick={() => _toggleMenu(false)}
      >
        <AboutIcon />
        <div>
          About
        </div>
      </Menu>
    </MenuContainer>
  </RootContainer>
);

const mapStateToProps = ({ main }) => ({
  colorscheme: main.colorscheme,
  viewportSize: main.viewportSize,
});

const mapDispatchToProps = dispatch => ({
  _toggleMenu: status => dispatch(toggleMenu(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuHome);

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { switchColorscheme } from 'redux/modules/main';
import { toggleMenu } from 'redux/modules/menu';
import Button from 'App/common/styles/Button';

const RootContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  font-size: 20px;
  flex-flow: column;
  align-items: top;
`;

const Layer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 50px;
`;

const MenuContent = ({ dynamicMenu, _toggleMenu }) => (
  <RootContainer>
    <Layer style={{ justifyContent: 'space-between' }}>
      <span>
        {dynamicMenu.title}
      </span>
      <Button
        onClick={() => _toggleMenu(false)}
      >
        Close
      </Button>
    </Layer>
    {dynamicMenu.content}
  </RootContainer>
);

const mapStateToProps = ({ menu }) => ({
  dynamicMenu: menu.dynamicMenu,
});

const mapDispatchToProps = dispatch => ({
  changeColorscheme: (colorscheme) => {
    dispatch(switchColorscheme(colorscheme));
  },
  _toggleMenu: (status) => {
    dispatch(toggleMenu(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { switchColorscheme } from 'redux/modules/main';
import { toggleMenu } from 'redux/modules/menu';
import Button from 'App/common/styles/Button';

const RootContainer = styled.div`
  width: 100%;
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

const MenuContent = ({ dynamicMenu, toggleMenu }) => (
  <RootContainer>
    <Layer style={{ justifyContent: 'space-between' }}>
      <span>
        {dynamicMenu.title}
      </span>
      <Button
        onClick={() => toggleMenu(false)}
      >
        Close
      </Button>
    </Layer>
    {dynamicMenu.content}
  </RootContainer>
);

export default connect(
  ({ menu }) => ({
    dynamicMenu: menu.dynamicMenu,
  }),
  dispatch => ({
    changeColorscheme: (colorscheme) => {
      dispatch(switchColorscheme(colorscheme));
    },
    toggleMenu: (status) => {
      dispatch(toggleMenu(status));
    },
  }),
)(MenuContent);

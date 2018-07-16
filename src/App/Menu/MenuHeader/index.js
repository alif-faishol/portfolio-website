import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toggleMenu, changeMenuContent } from 'redux/modules/menu';
import Button from 'App/common/styles/Button';

const RootContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
  height: 50px;
  font-size: 20px;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex: 1 0 100px;
`;

const ClosedMenu = ({
  title,
  dynamicMenu,
  _changeMenuContent,
  _toggleMenu,
}) => (
  <RootContainer>
    <Column>
      <Link to="/">
        <Button>
          Home
        </Button>
      </Link>
    </Column>
    <Column style={{ flexGrow: 9 }}>
      <span style={{ margin: '0 auto' }}>
        {title}
      </span>
    </Column>
    <Column>
      {typeof (dynamicMenu.link) === 'string'
        ? (
          <a href={dynamicMenu.link}>
            <Button
              style={{
                marginLeft: 'auto',
              }}
            >
              {dynamicMenu.name}
            </Button>
          </a>
        )
        : (
          <Button
            onClick={() => {
              _changeMenuContent('dynamicMenu');
              _toggleMenu();
            }}
            style={{
              marginLeft: 'auto',
            }}
          >
            {dynamicMenu.button}
          </Button>
        )
      }
    </Column>
  </RootContainer>
);

const mapStateToProps = ({ menu }) => ({
  dynamicMenu: menu.dynamicMenu,
  title: menu.title,
});

const mapDispatchToProps = dispatch => ({
  _toggleMenu: () => {
    dispatch(toggleMenu());
  },
  _changeMenuContent: (content) => {
    dispatch(changeMenuContent(content));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ClosedMenu);

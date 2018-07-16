import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleMenu } from 'redux/modules/menu';
import styled from 'styled-components';
import Loading from 'App/common/animation/Loading';
import Footer from 'App/common/Footer';
import ContentContainer from './styles/ContentContainer';

const Centered = styled.div`
  margin-top: ${viewportSize => viewportSize.height / 2 - 100 - 50}px;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class MainRouteContainer extends React.Component {
  static propTypes = {
    menuExpanded: PropTypes.bool.isRequired,
    _toggleMenu: PropTypes.func.isRequired,
    menuContent: PropTypes.string.isRequired,
    onTransition: PropTypes.bool.isRequired,
    viewportSize: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    const { menuExpanded, _toggleMenu } = this.props;
    if (menuExpanded) {
      _toggleMenu(false);
    }
  }

  render() {
    const {
      menuContent,
      onTransition,
      menuExpanded,
      viewportSize,
      children,
    } = this.props;
    return menuContent === 'home'
      && (
        onTransition || menuExpanded
      )
      ? (
        <Centered viewportSize={viewportSize}>
          <Loading />
        </Centered>)
      : (
        <div>
          <ContentContainer>
            {children}
          </ContentContainer>
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = ({ main, menu }) => ({
  viewportSize: main.viewportSize,
  menuExpanded: menu.menuExpanded,
  menuContent: menu.menuContent,
  onTransition: main.onTransition,
});

const mapDispatchToProps = dispatch => ({
  _toggleMenu: (toBe) => {
    dispatch(toggleMenu(toBe));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouteContainer);

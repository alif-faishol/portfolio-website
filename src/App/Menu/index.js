import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleTutor, toggleTransitionStatus } from 'redux/modules/main';
import { toggleMenu, changeMenuContent } from 'redux/modules/menu';
import { TweenMax, Power3 } from 'gsap';
import ContentContainer from '../common/styles/ContentContainer';
import MenuHeader from './MenuHeader';
import DynamicMenu from './DynamicMenu';
import MenuHome from './MenuHome';

const RootContainer = styled.div`
  z-index: 100;
  position: fixed;
  width: 100%;
  overflow: hidden;
  top: 0;
  background-color: ${({ colorscheme }) => colorscheme.menuBG};
`;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.stateConstructor = menuContent => (
      menuContent === 'home'
        ? {
          RootContainerAni: {
            height: ['100vh', 50],
            borderBottomWidth: [100, 5],
            y: [0, 0],
          },
          MenuHeaderAni: {
            height: [0, 50],
          },
        }
        : {
          RootContainerAni: {
            height: ['auto', 50],
            borderBottomWidth: [5, 5],
            y: [-50, 0],
          },
          MenuHeaderAni: {
            height: [50, 50],
          },
        }
    );
    this.state = this.stateConstructor(props.menuContent);
    this.animated = {};
    this.animate = (target, val, cb = (() => null), menuExpanded) => {
      if (menuExpanded) {
        TweenMax
          .set(target, {
            ...Object.keys(val).reduce((total, cur) => ({
              ...total,
              [cur]: val[cur][0],
            }), {}),
          });
      }
      TweenMax[menuExpanded ? 'from' : 'to'](target, 0.75, {
        ...Object.keys(val).reduce((total, cur) => ({
          ...total,
          [cur]: val[cur][1],
        }), {}),
        onComplete() {
          cb();
        },
        ease: Power3.easeOut,
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      menuExpanded,
      _toggleTransitionStatus,
      match,
    } = this.props;
    if (
      (nextProps.menuExpanded !== menuExpanded) || (match.isExact !== nextProps.match.isExact)
    ) {
      const nextState = this.stateConstructor(nextProps.menuContent);
      _toggleTransitionStatus(true);
      this.animate(
        this.animated.RootContainer,
        nextState.RootContainerAni,
        () => null,
        nextProps.menuExpanded,
      );
      this.animate(
        this.animated.MenuHeader,
        nextState.MenuHeaderAni,
        () => {
          _toggleTransitionStatus(false);
          this.setState(nextState);
        },
        nextProps.menuExpanded,
      );
    }
  }

  componentDidUpdate() {
    this.animated.RootContainer.scrollTop = 0;
  }

  render() {
    const {
      colorscheme,
      onTransition,
      match,
      menuContent,
    } = this.props;

    const {
      RootContainerAni,
      MenuHeaderAni,
    } = this.state;

    return (
      <div>
        <RootContainer
          innerRef={(ref) => { this.animated.RootContainer = ref; }}
          colorscheme={colorscheme}
          style={{
            borderBottom: `${RootContainerAni.borderBottomWidth[1]}px solid black`,
            boxShadow: '3px 3px 2px 0 rgba(0, 0, 0, 0.1)',
            overflow: !onTransition && match.isExact ? 'auto' : 'hidden',
          }}
        >
          <ContentContainer>
            <div
              ref={(ref) => { this.animated.MenuHeader = ref; }}
              style={{
                height: MenuHeaderAni.height[0],
                overflow: 'hidden',
              }}
            >
              <MenuHeader />
            </div>
            {menuContent === 'home'
                ? <MenuHome />
                : <DynamicMenu />
            }
          </ContentContainer>
        </RootContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ main, menu }) => ({
  onTransition: main.onTransition,
  showTutor: main.showTutor,
  menuExpanded: menu.menuExpanded,
  menuContent: menu.menuContent,
  colorscheme: main.colorscheme,
});

const mapDispatchToProps = dispatch => ({
  _toggleTutor: () => {
    dispatch(toggleTutor());
  },
  _toggleTransitionStatus: (status) => {
    dispatch(toggleTransitionStatus(status));
  },
  _toggleMenu: (status) => {
    dispatch(toggleMenu(status));
  },
  _changeMenuContent: (content) => {
    dispatch(changeMenuContent(content));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

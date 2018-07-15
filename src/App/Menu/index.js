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
    this.animate = (target, val, cb = (() => null)) => {
      const {
        menuExpanded,
      } = this.props;
      if (!menuExpanded) {
        TweenMax
          .set(target, {
            ...Object.keys(val).reduce((total, cur) => {
              total[cur] = val[cur][0];
              return total;
            }, {}),
          });
      }
      TweenMax[menuExpanded ? 'to' : 'from'](target, 0.75, {
        ...Object.keys(val).reduce((total, cur) => {
          total[cur] = val[cur][1];
          return total;
        }, {}),
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
    } = this.props;
    if (
      (nextProps.menuExpanded !== menuExpanded)
    ) {
      const nextState = this.stateConstructor(nextProps.menuContent);
      _toggleTransitionStatus(true);
      this.animate(
        this.animated.RootContainer,
        nextState.RootContainerAni,
      );
      this.animate(
        this.animated.MenuHeader,
        nextState.MenuHeaderAni,
        () => {
          _toggleTransitionStatus(false);
          this.setState(nextState);
        },
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
            height: RootContainerAni.height[0],
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

export default connect(
  state => ({
    onTransition: state.main.onTransition,
    showTutor: state.main.showTutor,
    menuExpanded: state.menu.menuExpanded,
    menuContent: state.menu.menuContent,
    colorscheme: state.main.colorscheme,
  }),
  dispatch => ({
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
  }),
)(Menu);

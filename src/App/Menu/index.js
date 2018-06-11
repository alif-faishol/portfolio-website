import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {toggleTutor, toggleTransitionStatus} from 'redux/modules/main'
import {toggleMenu} from 'redux/modules/menu'
import ContentContainer from '../common/styles/ContentContainer'
import MenuHeader from './MenuHeader'
import DynamicMenu from './DynamicMenu'
import MenuHome from './MenuHome'
import {TweenMax, Power3} from 'gsap'

const RootContainer = styled.div`
  z-index: 100;
  position: fixed;
  width: 100%;
  overflow: hidden;
  bottom: 0;
  top: 0;
  background-color: ${props => props.colorscheme.menuBG};
`

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.stateConstructor = props => (
      props.menuContent === "home"
      ? {
        RootContainerAni: {
          height: props.match.isExact || props.menuExpanded
          ? props.viewportSize.height : 50,
          borderBottomWidth: props.match.isExact || props.menuExpanded
          ? 100 : 5
        },
        MenuHeaderAni: {
          height: props.match.isExact || props.menuExpanded
          ? 0 : 50,
        }
      }
      : {
        RootContainerAni: {
          height: props.menuExpanded ? 100 : 50,
          borderBottomWidth: 5,
        },
        MenuHeaderAni: {
          height: props.menuExpanded ? 0 : 50,
        }
      }
    )
    this.state = this.stateConstructor(props)
    this.animated = {}
    this.animate = (target, val, cb) => {
      cb = cb || (() => null)
      val = {
        duration: 0.75,
        ...val
      }
      return TweenMax
        .to(target, val.duration, {
          ...val,
          onComplete() {
            cb()
          },
          ease: Power3.easeOut
        })
    }
  }
  componentDidMount() {
    this.props.match.isExact
      && !this.props.menuExpanded
      && this.props.toggleMenu(true)
  }
  componentWillReceiveProps(nextProps) {
    nextProps.match.isExact
      && !nextProps.menuExpanded
      && nextProps.toggleMenu(true)

    if(
      (nextProps.menuExpanded !== this.props.menuExpanded)
      || (nextProps.menuExpanded && nextProps.viewportSize !== this.props.viewportSize)
    ) {
      const nextState = this.stateConstructor(nextProps)
      nextProps.toggleTransitionStatus(true)
      this.animate(
        this.animated.RootContainer,
        nextState.RootContainerAni
      )
      this.animate(
        this.animated.MenuHeader,
        nextState.MenuHeaderAni,
        () => {
          nextProps.toggleTransitionStatus(false)
          this.setState(nextState)
        }
      )
    }
  }
  render() {
    return (
      <div>
        <RootContainer
          innerRef={ref => this.animated.RootContainer = ref}
          colorscheme={this.props.colorscheme}
          style={{
            ...(!this.props.menuExpanded && {overflowY: 'hidden'}),
            height: this.state.RootContainerAni.height,
            borderBottom: this.state.RootContainerAni.borderBottomWidth + 'px solid black',
            boxShadow: '3px 3px 2px 0 rgba(0, 0, 0, 0.1)'
          }}
        >
          <ContentContainer>
            <div
              ref={ref => this.animated.MenuHeader = ref}
              style={{
                overflow: 'hidden',
                height: this.state.MenuHeaderAni.height
              }}
            >
              <MenuHeader/>
            </div>
            {this.props.menuContent === "home"
                ? <MenuHome/>
                : <DynamicMenu/>
            }
          </ContentContainer>
        </RootContainer>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    showTutor: state.main.showTutor,
    menuExpanded: state.menu.menuExpanded,
    menuContent: state.menu.menuContent,
    colorscheme: state.main.colorscheme,
    viewportSize: state.main.viewportSize
  }),
  dispatch => ({
    toggleTutor: () => {
      dispatch(toggleTutor())
    },
    toggleTransitionStatus: status => {
      dispatch(toggleTransitionStatus(status))
    },
    toggleMenu: status => {
      dispatch(toggleMenu(status))
    }
  })
)(Menu)

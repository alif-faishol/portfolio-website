import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {toggleTutor, toggleTransitionStatus} from 'redux/modules/main'
import {toggleMenu} from 'redux/modules/menu'
import ContentContainer from '../common/styles/ContentContainer'
import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'
import MenuHome from './MenuHome'

import {TweenMax, Elastic} from 'gsap'


const RootContainer = styled.div`
  &::-webkit-scrollbar {
    width: 0;
  }
  z-index: 100;
-ms-overflow-style: none;
  position: fixed;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  bottom: 0;
  top: 0;
  background-color: ${props => props.colorscheme.menuBG};
`

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.stateConstructor = props => ({
      RootContainerAni: {
        height: props.match.isExact || props.menuExpanded
        ? props.viewportSize.height
        : 50,
        borderBottomWidth: props.match.isExact || props.menuExpanded
        ? 100
        : 5
      },
      MenuHeaderAni: {
        height: props.match.isExact || props.menuExpanded
        ? 0
        : 50,
      }
    })
    this.state = this.stateConstructor(props)
    this.animated = {}
    this.animate = (target, val, cb) => {
      cb = cb || (() => null)
      val = {
        duration: 1.5,
        ...val
      }
      return TweenMax
        .to(target, val.duration, {
          ...val,
          onComplete() {
            cb()
          },
          ease: Elastic.easeOut.config(0.25, 1)
        })
    }
  }
  componentDidMount() {
    if(this.props.match.isExact) {
      this.props.toggleMenu(true)
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.menuExpanded !== this.props.menuExpanded) {
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
            <div>
              {this.props.menuContent === "home"
                  ? <MenuHome/>
                  : <MenuContent/>
              }
            </div>
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

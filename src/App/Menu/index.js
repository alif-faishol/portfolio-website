import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {toggleTutor} from 'redux/modules/main'
import ContentContainer from '../common/styles/ContentContainer'
import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'
import MenuHome from './MenuHome'

import {TweenLite, Elastic} from 'gsap'

const animation = (target, val, cb) => {
  cb = cb || (() => null)
  val = {
    duration: 1.5,
    ...val
  }
    return TweenLite
      .to(target, val.duration, {
        ...val,
        onComplete() {
          cb()
        },
        ease: Elastic.easeOut.config(0.25, 1)
      })
}

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
      show: props.match.isExact || props.menuExpanded,
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
  }
  componentWillReceiveProps(nextProps) {
    const nextState = this.stateConstructor(nextProps)
    animation(
      this.animated.RootContainer,
      nextState.RootContainerAni
    )
    animation(
      this.animated.MenuHeader,
      nextState.MenuHeaderAni,
      () => this.setState(nextState)
    )
  }
  render() {
    return (
      <div>
        <RootContainer
          innerRef={ref => this.animated.RootContainer = ref}
          colorscheme={this.props.colorscheme}
          style={{
            ...(!this.state.show && {overflowY: 'hidden'}),
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
    }
  })
)(Menu)

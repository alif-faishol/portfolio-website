import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {toggleTutor} from 'redux/modules/main'
import ContentContainer from '../common/styles/ContentContainer'
import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'
import MenuHome from './MenuHome'

import {TweenMax, Elastic} from 'gsap'

const animation = (target, val, cb) => {
  cb = cb || (() => null)
  val = {
    ...{
      height: 0,
      borderBottomWidth: 0,
      duration: 1.5
    },
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

const BehindContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.show = props.match.isExact || props.menuExpanded
    this.state = {
      height: this.show ? props.viewportSize.height : 50,
      opacity: this.show ? 0.5 : 0,
      borderBottomWidth: this.show ? 100 : 5
    }
    this.animated = {}
  }
  componentWillReceiveProps(nextProps) {
    const newState = {
      height: nextProps.match.isExact || nextProps.menuExpanded
      ? nextProps.viewportSize.height
      : 50,
      opacity: nextProps.match.isExact || nextProps.menuExpanded
      ? 0.5
      : 0,
      borderBottomWidth: nextProps.match.isExact || nextProps.menuExpanded
      ? 100
      : 5
    }
    animation(
      this.animated.RootContainer,
      ({...newState, opacity: 1}),
      () => this.setState(newState)
    )
    animation(
      this.animated.BehindContainer,
      ({opacity: newState.opacity}),
      () => this.setState(newState)
    )
  }
  render() {
    return (
      <div>
        <BehindContainer
          innerRef={ref => this.animated.BehindContainer = ref}
          style={{
            opacity: this.state.opacity,
            ...(!this.state.opacity && {display: 'none'})
          }}
        />
        <RootContainer
          innerRef={ref => this.animated.RootContainer = ref}
          colorscheme={this.props.colorscheme}
          style={{
            ...(!this.show && {overflowY: 'hidden'}),
            height: this.state.height,
            borderBottom: this.state.borderBottomWidth + 'px solid black',
          }}
        >
          <ContentContainer>
            <MenuHeader
              notHome={(!this.show || this.props.menuContent !== "home")}
            />
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

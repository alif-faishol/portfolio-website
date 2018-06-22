import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {toggleTutor, toggleTransitionStatus} from 'redux/modules/main'
import {toggleMenu, changeMenuContent} from 'redux/modules/menu'
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
          height: ['100%', 50],
          borderBottomWidth: [100, 5],
        },
        MenuHeaderAni: {
          height: [0, 50]
        }
      }
      : {
        RootContainerAni: {
          height: ['auto', 50],
          borderBottomWidth: [5, 5],
          y: [-50, 0]
        },
        MenuHeaderAni: {
        }
      }
    )
    this.state = this.stateConstructor(props)
    this.animated = {}
    this.animate = (target, val, cb) => {
      cb = cb || (() => null)
      if(!this.props.menuExpanded) {
        TweenMax
          .set(target, {
            ...Object.keys(val).reduce((total, cur) => {
              total[cur] = val[cur][0]
              return total
            }, {}),
          })
      }
      TweenMax[this.props.menuExpanded ? 'to' : 'from'](target, 0.75, {
          ...Object.keys(val).reduce((total, cur) => {
            total[cur] = val[cur][1]
            return total
          }, {}),
          onComplete() {
            cb()
          },
          ease: Power3.easeOut
        })
    }
  }
  componentDidMount() {
    if(this.props.match.isExact) {
      !this.props.menuExpanded && this.props.toggleMenu(true)
      if(this.props.menuContent !== 'home') {
        this.props.changeMenuContent('home')
        this.props.toggleMenu(false)
        this.props.toggleMenu(true)
      }
    }
  }
  componentDidUpdate() {
    if(this.props.match.isExact) {
      !this.props.menuExpanded && this.props.toggleMenu(true)
      if(this.props.menuContent !== 'home') {
        this.props.changeMenuContent('home')
        this.props.toggleMenu(false)
        this.props.toggleMenu(true)
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if(
      (nextProps.menuExpanded !== this.props.menuExpanded)
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
            height: this.state.RootContainerAni.height[1],
            borderBottom: this.state.RootContainerAni.borderBottomWidth[1] + 'px solid black',
            boxShadow: '3px 3px 2px 0 rgba(0, 0, 0, 0.1)'
          }}
        >
          <ContentContainer>
            <div
              ref={ref => this.animated.MenuHeader = ref}
              style={{
                overflow: 'hidden',
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
    },
    changeMenuContent: content => {
      dispatch(changeMenuContent(content))
    }
  })
)(Menu)

import React from 'react'
import {connect} from 'react-redux'
import {Motion, spring} from 'react-motion'
import styled from 'styled-components'
import {toggleTutor} from '../../action'
import ContentContainer from '../common/styles/ContentContainer'
import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'
import MenuHome from './MenuHome'

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
    this.state = {
      menuCompletelyHided: !(props.match.isExact || props.menuExpanded)
    }
    this.reactMotionConf = {stiffness: 60, damping: 15}
  }
  componentWillReceiveProps(nextProps) {
    nextProps.menuExpanded &&
    this.setState({menuCompletelyHided: !nextProps.menuExpanded})
  }
  render() {
    this.show = this.props.match.isExact || this.props.menuExpanded
    return (
      <Motion
        defaultStyle={{
          height: this.show
          ? this.props.viewportSize.height
          : 50,
          opacity: this.show
          ? 0.5
          : 0,
          borderBottom: this.show
          ? 100
          : 5,
        }}
        style={{
          height: this.show
          ? spring(this.props.viewportSize.height, this.reactMotionConf)
          : spring(50, this.reactMotionConf),
          opacity: this.show
          ? spring(0.5, this.reactMotionConf)
          : spring(0, this.reactMotionConf),
          borderBottom: this.show
          ? spring(100, {stiffness: 60, damping: 15})
          : spring(5, {stiffness: 60, damping: 15})
        }}
        onRest={
          () => {
            this.setState({
              menuCompletelyHided: !this.show,
            })
          }
        }
      >
        {interpolatingStyles => (
          <div>
            <BehindContainer
              style={{
                opacity: interpolatingStyles.opacity,
                ...(!interpolatingStyles.opacity && {display: 'none'})
              }}
            />
            <RootContainer
              colorscheme={this.props.colorscheme}
              style={{
                ...(!this.show && {overflowY: 'hidden'}),
                height: interpolatingStyles.height,
                borderBottom: interpolatingStyles.borderBottom + 'px solid black',
              }}
            >
              <ContentContainer>
                <MenuHeader root={this.props.match.isExact} menuExpanded={this.show}/>

                {!this.state.menuCompletelyHided && (
                      <div>
                        {this.props.match.isExact
                            ? <MenuHome/>
                            : <MenuContent/>
                        }
                      </div>
                )}
              </ContentContainer>
            </RootContainer>
          </div>
        )}
      </Motion>
    )
  }
}

export default connect(
  (state) => ({
    showTutor: state.main.showTutor,
    menuExpanded: state.menu.menuExpanded,
    colorscheme: state.main.colorscheme,
    viewportSize: state.main.viewportSize
  }),
  dispatch => ({
    toggleTutor: () => {
      dispatch(toggleTutor())
    }
  })
)(Menu)

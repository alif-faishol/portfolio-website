import React from 'react'
import {connect} from 'react-redux'
import {Motion, spring} from 'react-motion'
import styled from 'styled-components'
import {toggleTutor} from '../../action'
import color from '../common/themes'
import ContentContainer from '../common/styles/ContentContainer'
import MenuHeader from './MenuHeader'

const RootContainer = styled.div`
  &::-webkit-scrollbar {
    width: 0;
  }
  z-index: 100;
  position: fixed;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  bottom: 0;
  top: 0;
  background-color: ${props => color(props.colorscheme).A};
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
          ? 200
          : 5,
        }}
        style={{
          height: this.show
          ? spring(this.props.viewportSize.height)
          : spring(50),
          opacity: this.show
          ? spring(0.5, {stiffness: 60, damping: 15})
          : spring(0, {stiffness: 60, damping: 15}),
          borderBottom: this.show
          ? spring(200, {stiffness: 60, damping: 15})
          : spring(5, {stiffness: 60, damping: 15})
        }}
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
              style={{
                ...(!this.show && {overflowY: 'hidden'}),
                height: interpolatingStyles.height,
                borderBottom: interpolatingStyles.borderBottom + 'px solid black',
              }}
            >
              <ContentContainer>
                <MenuHeader menuExpanded={this.show}/>
              </ContentContainer>
            </RootContainer>
          </div>
        )}
      </Motion>
    )
  }
}

export default connect(
  ({main}) => ({
    showTutor: main.showTutor,
    menuExpanded: main.menuExpanded,
    colorscheme: main.colorscheme,
    viewportSize: main.viewportSize
  }),
  dispatch => ({
    toggleTutor: () => {
      dispatch(toggleTutor())
    }
  })
)(Menu)

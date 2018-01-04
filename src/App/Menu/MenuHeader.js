import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {toggleMenu} from '../../action'
import mojs from 'mo-js'

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const MenuToggleBtn = styled.div`
  background-color: gray;
  height: 50px;
`

const LogoAF = styled.div`
  background-color: white;
  height: 50px;
  width: 100px;
  position: relative;
`


class ClosedMenu extends React.Component {
  componentDidMount() {
    this.Logo = new mojs.Shape({
      shape: 'rect',
      x: 0,
      y: 0,
      fill: 'blue',
      parent: this.LogoAF
    })
    this.Logo.play()
    console.log(this.LogoAF)
  }
  render() {
    return (
      <RootContainer>
        <MenuToggleBtn
          onClick={this.props.toggleMenu}
        >
          Click to Toggle the Menu
        </MenuToggleBtn>
        <LogoAF innerRef={ref => {this.LogoAF = ref}} />
      </RootContainer>
    )
  }
}

export default connect(null,
  dispatch => ({
    toggleMenu: () => {
      dispatch(toggleMenu())
    }
  })
)(ClosedMenu)

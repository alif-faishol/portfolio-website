import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {switchColorscheme} from 'redux/modules/main'
import {toggleMenu} from 'redux/modules/menu'
import Button from 'App/common/styles/Button'

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  height: 150px;
  font-size: 20px;
  flex-flow: column;
  align-items: top;
`

const Layer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 50px;
`

const MenuContent = props => (
  <RootContainer>
    <Layer style={{justifyContent: 'space-between'}}>
      <span>{props.dynamicMenu.title}</span>
      <Button
        onClick={() => props.toggleMenu(false)}
      >
        Close
      </Button>
    </Layer>
    <Layer style={{flex: '0 0 100px'}}>
      {props.dynamicMenu.content}
    </Layer>
  </RootContainer>
)

export default connect(
  ({menu}) => ({
    dynamicMenu: menu.dynamicMenu
  }),
  dispatch => ({
    changeColorscheme: (colorscheme) => {
      dispatch(switchColorscheme(colorscheme))
    },
    toggleMenu: status => {
      dispatch(toggleMenu(status))
    }
  })
)(MenuContent)

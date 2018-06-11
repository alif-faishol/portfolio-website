import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {switchColorscheme} from 'redux/modules/main'
import {toggleMenu} from 'redux/modules/menu'
import Button from 'App/common/styles/Button'

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  font-size: 20px;
  flex-flow: column;
  align-items: top;
`

const Layer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
`

const MenuContent = props => (
  <RootContainer>
    <Layer>
      <Button
        onClick={() => props.toggleMenu(false)}
      >
        Close
      </Button>
    </Layer>
    <Layer></Layer>
  </RootContainer>
)

export default connect(null,
  dispatch => ({
    changeColorscheme: (colorscheme) => {
      dispatch(switchColorscheme(colorscheme))
    },
    toggleMenu: status => {
      dispatch(toggleMenu(status))
    }
  })
)(MenuContent)

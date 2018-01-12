import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {switchColorscheme} from '../../../action'

const RootContainer = styled.div`
  display: flex;
`

const MenuContent = props => (
  <RootContainer>
    Hallo
    <button onClick={() => props.changeColorscheme('experiment')}>experiment</button>
    <button onClick={() => props.changeColorscheme('light')}>light</button>
  </RootContainer>
)

export default connect(null,
  dispatch => ({
      changeColorscheme: (colorscheme) => {
        dispatch(switchColorscheme(colorscheme))
      } 
    })
)(MenuContent)

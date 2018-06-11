import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

const ButtonStyled = styled.button`
  height: 50px;
  font: inherit;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    background-color: ${props => props.colorscheme.highlight};
  }
  &:focus {
    outline: 0;
  }
`

const Button = props => (
  <ButtonStyled
    colorscheme={props.colorscheme}
    {...props}
  >
    {props.children}
  </ButtonStyled>
)

export default connect(
  ({main}) => ({
    colorscheme: main.colorscheme
  })
)(Button)

import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
`

const Button = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  width: 70px;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.active ? '1' : '.5'};
  &:hover {
    background-color: ${props => props.active && props.colorscheme.highlight};
  }
  &:active {
    ${props => props.active && 'font-size: 15px;'}
  }
`

const Paginator = props => (
  <Container>
    <Button
      active={props.active !== 1}
      colorscheme={props.colorscheme}
    >
      prev
    </Button>
    <div
      style={{
        fontSize: '20px'
      }}
    >
      {props.active} / {props.pages}
    </div>
    <Button
      active={props.active !== props.pages}
      colorscheme={props.colorscheme}
    >
      next
    </Button>
  </Container>
)

export default connect(
  ({main}) => ({
    colorscheme: main.colorscheme
  })
)(Paginator)

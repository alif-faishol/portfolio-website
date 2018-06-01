import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  a {
    text-decoration: none;
    color: inherit;
  }
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

const nextPage = (page, total) => page <= total ? page : total
const prevPage = (page) => page !== 0 ? page : 1

const Paginator = props => (
  <Container>
    <Link to={props.baseUrl + prevPage((parseInt(props.active, 10) - 1))}>
      <Button
        active={parseInt(props.active, 10) !== 1}
        colorscheme={props.colorscheme}
      >
        prev
      </Button>
    </Link>
    <div
      style={{
        fontSize: '20px'
      }}
    >
      {props.active} / {props.pages}
    </div>
    <Link to={props.baseUrl + nextPage((parseInt(props.active, 10) + 1), props.pages)}>
      <Button
        active={parseInt(props.active, 10) !== parseInt(props.pages, 10)}
        colorscheme={props.colorscheme}
      >
        next
      </Button>
    </Link>
  </Container>
)

export default connect(
  ({main}) => ({
    colorscheme: main.colorscheme
  })
)(Paginator)

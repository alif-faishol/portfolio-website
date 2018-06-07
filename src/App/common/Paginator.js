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

const PrevBtn = props => (
  props.activePage - 1 !== 0 ?
    (<Link
      to={props.baseUrl + (props.activePage - 1)}
      onClick={window.scroll({top: 0})}
    >
      <Button
        active={true}
        colorscheme={props.colorscheme}
      >
        prev
      </Button>
    </Link>)
  :
    (<Button
      active={false}
      colorscheme={props.colorscheme}
    >
      prev
    </Button>)
)

const NextBtn = props => (
  props.activePage + 1 <= props.totalPage ?
    (<Link
      to={props.baseUrl + (props.activePage + 1)}
      onClick={window.scroll({top: 0})}
    >
      <Button
        active={true}
        colorscheme={props.colorscheme}
      >
        next
      </Button>
    </Link>)
    :
    (<Button
      active={false}
      colorscheme={props.colorscheme}
    >
      next
    </Button>)
)

const Paginator = props => (
  <Container>
    <PrevBtn
      activePage={parseInt(props.activePage, 10)}
      baseUrl={props.baseUrl}
      colorscheme={props.colorscheme}
    />
    <div
      style={{
        fontSize: '20px'
      }}
    >
      {props.activePage} / {props.totalPage}
    </div>
    <NextBtn
      totalPage={parseInt(props.totalPage, 10)}
      activePage={parseInt(props.activePage, 10)}
      baseUrl={props.baseUrl}
      colorscheme={props.colorscheme}
    />
  </Container>
)

export default connect(
  ({ main }) => ({
    colorscheme: main.colorscheme
  })
)(Paginator)

import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const RootContainer = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-flow: column;
  margin: 3%;
  & div.category {
    display: inline-block;
    font-size: 15px;
    color: white;
    padding: 5px;
    margin-right: auto;
    background-color: ${props => props.color};
  }
  & div.square {
    box-shadow: inset 0 0 0 2px black, 3px 3px 2px 0 rgba(0, 0, 0, 0.1);
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
  & div.title {
    margin-top: 5%;
    text-align: center;
  }
`

const PortfolioItem = props => (
  <RootContainer
    color={props.colorscheme[
      props.category === "Graphic Design"
        ? 'accent1'
        : (props.category === "Motion Graphics"
        ? 'accent2' : 'accent3') 
    ]}
    onClick={props.onClick}
  >
    <div
      className='category'
    >{props.category}
    </div>
    <div
      style={{backgroundImage: `url(${props.thumbnail})`}}
      className='square'
    />
    <div className='title'>{props.title}</div>
  </RootContainer>
)

export default connect(
  ({main}) => ({
    colorscheme: main.colorscheme
  })
)(PortfolioItem)


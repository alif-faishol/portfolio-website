import React from 'react'
import styled from 'styled-components'

const RootContainer = styled.div`
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  & div.square {
    box-shadow: 0 0 2px #000000;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
`

export default props => (
  <RootContainer>
    <div
      style={{backgroundImage: `url(${props.thumbnail})`}}
      className='square'
    >
    </div>
  </RootContainer>
)

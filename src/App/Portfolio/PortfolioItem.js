import React from 'react'
import styled from 'styled-components'

const RootContainer = styled.div`
  flex: 0 0 300px;
  display: flex;
  margin: 3%;
  & div.square {
    box-shadow: inset 0 0 0 2px black, 3px 3px 2px 0 rgba(0, 0, 0, 0.1);
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

import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const RootContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  & .content-container {
    margin-top: 100px;
    max-width: 1000px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  & .content {
    background-color: white;
  }
`

const ItemDetails = props => (
  props.detailsData.show
  ? (
    <RootContainer>
      <div className='content-container'>
        <div className='content'>ini detail</div>
      </div>
    </RootContainer>
  )
  : null
)

export default connect(
  ({portfolio}) => ({
    detailsData: portfolio.detailsData
  })
)(ItemDetails)

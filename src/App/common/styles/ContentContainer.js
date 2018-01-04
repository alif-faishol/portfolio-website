import React from 'react'
import styled from 'styled-components'

const RootContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  justify-content: center;
`

const ContainerHelper = styled.div`
  width: 100rem;
  overflow: hidden;
  margin: 0 15px;
`

export default (props) => (
  <RootContainer>
    <ContainerHelper>
      {props.children}
    </ContainerHelper>
  </RootContainer>
)

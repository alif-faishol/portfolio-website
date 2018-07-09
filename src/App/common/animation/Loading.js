import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: .25rem solid ${props => 'rgba(' + props.scheme.substring(4, props.scheme.length-1) + ', 0.2)'};
  border-top-color: ${props => props.scheme};
  animation: spin 1s infinite linear;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default props =>  (
  <Spinner
    scheme={
      props.color !== undefined
        ? props.color
        : 'rgb(0, 0, 0)'
    }
  />
)

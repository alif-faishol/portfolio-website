import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RootContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  justify-content: center;
  @media screen and (min-width: 500px) {
    width: 90%;
  }
`;

const ContainerHelper = styled.div`
  width: 100rem;
  overflow: hidden;
`;

const ContentContainer = ({ children }) => (
  <RootContainer>
    <ContainerHelper>
      {children}
    </ContainerHelper>
  </RootContainer>
);

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentContainer;

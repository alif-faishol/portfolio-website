import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RootContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  justify-content: center;
`;

const ContainerHelper = styled.div`
  width: 100rem;
  overflow: hidden;
  margin: 0 15px;
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

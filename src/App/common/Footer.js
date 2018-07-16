import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ContentContainer from 'App/common/styles/ContentContainer';

const RootContainer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  padding: 15px 15px;
  background-color: ${({ colorscheme }) => colorscheme.highlight};
  & div.info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 2.3;
    text-align: right;
  }
  & a:hover {
    opacity: 0.8;
  }
`;

const Footer = ({ commitHash, colorscheme }) => (
  <RootContainer colorscheme={colorscheme}>
    <ContentContainer>
      <div className="info">
        <div>
          {'By '}
          <a
            href="https://github.com/alif-faishol"
            style={{
              borderBottom: 'solid 1px black',
              color: 'black',
            }}
          >
            {'Alif Faishol'}
          </a>
          {' ・ App Version: '}
          <a
            href={`https://github.com/alif-faishol/portfolio-website/tree/${commitHash}`}
            style={{
              backgroundColor: colorscheme.accent3,
              color: 'white',
              borderRadius: 5,
              padding: 5,
              paddingBottom: 3,
            }}
          >
            {commitHash.slice(0, 7)}
          </a>
        </div>
      </div>
    </ContentContainer>
  </RootContainer>
);

const mapStateToProps = ({ main }) => ({
  commitHash: main.commitHash,
  colorscheme: main.colorscheme,
});

export default connect(mapStateToProps)(Footer);

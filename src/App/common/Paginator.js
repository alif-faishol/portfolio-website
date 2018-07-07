import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const Button = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  width: 70px;
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  opacity: ${({ active }) => (active ? '1' : '.5')};
  &:hover {
    background-color: ${({ active, colorscheme }) => active && colorscheme.highlight};
  }
  &:active {
    ${({ active }) => active && 'font-size: 15px;'}
  }
`;

const PrevBtn = ({ activePage, baseUrl, colorscheme }) => (
  activePage - 1 !== 0
    ? (
      <Link
        to={baseUrl + (activePage - 1)}
        onClick={window.scroll({ top: 0 })}
      >
        <Button
          active
          colorscheme={colorscheme}
        >
          prev
        </Button>
      </Link>)
    : (
      <Button
        active={false}
        colorscheme={colorscheme}
      >
        prev
      </Button>
    )
);

const NextBtn = ({ activePage, baseUrl, colorscheme, totalPage }) => (
  activePage + 1 <= totalPage
    ? (
      <Link
        to={baseUrl + (activePage + 1)}
        onClick={window.scroll({ top: 0 })}
      >
        <Button
          active
          colorscheme={colorscheme}
        >
          next
        </Button>
      </Link>)
    : (
      <Button
        active={false}
        colorscheme={colorscheme}
      >
        next
      </Button>
    )
);

const Paginator = ({ activePage, baseUrl, colorscheme, totalPage }) => (
  <Container>
    <PrevBtn
      activePage={parseInt(activePage, 10)}
      baseUrl={baseUrl}
      colorscheme={colorscheme}
    />
    <div
      style={{
        fontSize: '20px',
      }}
    >
      {`${activePage} / ${totalPage}`}
    </div>
    <NextBtn
      totalPage={parseInt(totalPage, 10)}
      activePage={parseInt(activePage, 10)}
      baseUrl={baseUrl}
      colorscheme={colorscheme}
    />
  </Container>
);

export default connect(
  ({ main }) => ({
    colorscheme: main.colorscheme,
  }),
)(Paginator);

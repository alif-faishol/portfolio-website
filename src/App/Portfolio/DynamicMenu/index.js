import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeFilter } from 'redux/modules/portfolio';
import Checkbox from './Checkbox';

export const DynamicMenuBtn = () => (
  <div
    style={{
      padding: '8px 8px 4px 8px',
      borderRadius: '5px',
      color: 'white',
      backgroundColor: 'black',
    }}
  >
    Filter
  </div>
);


const DynamicMenuContentView = ({
  colorscheme: {
    accent1,
    accent2,
    accent3,
  },
  _changeFilter,
}) => {
  const Reset = styled.div`
    display: inline-block;
    font-size: 15px;
    padding: 5px;
    cursor: pointer;
    &:before {
      content: "Reset";
    }
  `;

  return (
    <div style={{ paddingTop: '15px' }}>
      <Checkbox
        name="Graphic Design"
        color={accent1}
      />
      <Checkbox
        name="Motion Graphics"
        color={accent2}
      />
      <Checkbox
        name="Web Development"
        color={accent3}
      />
      <Reset
        onClick={() => _changeFilter()}
      />
    </div>
  );
};

const mapStateToProps = ({ main }) => ({
  colorscheme: main.colorscheme,
});

const mapDispatchToProps = dispatch => ({
  _changeFilter: filter => dispatch(changeFilter(filter)),
});

export const DynamicMenuContent = connect(
  mapStateToProps, mapDispatchToProps,
)(DynamicMenuContentView);

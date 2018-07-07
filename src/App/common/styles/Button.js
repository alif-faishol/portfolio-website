import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ButtonStyled = styled.button`
  height: 50px;
  font: inherit;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    background-color: ${({ colorscheme }) => colorscheme.highlight};
  }
  &:focus {
    outline: 0;
  }
`;

const Button = (props) => {
  const { colorscheme, children } = props;
  return (
    <ButtonStyled
      colorscheme={colorscheme}
      {...props}
    >
      {children}
    </ButtonStyled>

  );
};

Button.propTypes = {
  colorscheme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(
  ({ main }) => ({
    colorscheme: main.colorscheme,
  }),
)(Button);

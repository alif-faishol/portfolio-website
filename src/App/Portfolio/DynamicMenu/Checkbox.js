import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from 'redux/modules/portfolio';
import styled from 'styled-components';

const Checkbox = ({
  color,
  name,
  filter,
  _changeFilter,
}) => {
  const changeHandler = (event) => {
    _changeFilter({
      [name]: event.target.checked,
    });
  };
  const Label = styled.label`
    display: inline-block;
    font-size: 15px;
    color: white;
    padding: 5px;
    margin-bottom: 15px;
    margin-right: 15px;
    opacity: ${props => props.checked ? 1 : 0.5};
    background-color: ${props => props.color};
    cursor: pointer;
    & input {
      display: none;
    }
  `;
  const checked = filter[name] || filter[name] === undefined;

  return (
    <Label
      checked={checked}
      color={color}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={changeHandler}
      />
      {name}
    </Label>
  );
};

const mapStateToProps = ({ main, portfolio }) => ({
  filter: portfolio.filter,
  colorscheme: main.colorscheme,
});

const mapDispatchToProps = dispatch => ({
  _changeFilter: filter => dispatch(changeFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);

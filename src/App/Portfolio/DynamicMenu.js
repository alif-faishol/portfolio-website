import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {changeFilter} from 'redux/modules/portfolio'

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
)

const DynamicMenuContentView = props => {

  const Checkbox = props => {
    const changeHandler = event => {
      props.changeFilter({
        [props.name]: event.target.checked
      })
    }
    const Label = styled.label`
      display: inline-block;
      font-size: 15px;
      color: white;
      padding: 5px;
      margin: 0 10px 10px 0;
      opacity: ${props => props.checked ? 1 : 0.5};
      background-color: ${props => props.color};
      cursor: pointer;
      & input {
        display: none;
      }
    `
    const checked = 
      props.filter[props.name] || props.filter[props.name] === undefined
      ? true
      : false

    return (
      <Label 
        checked={checked}
        color={props.color}
      >
        <input
          name={props.id}
          type='checkbox'
          checked={checked}
          onChange={changeHandler}
        />
        {props.name}
      </Label>
    )
  }

  const Reset = styled.div`
    display: inline-block;
    font-size: 15px;
    padding: 5px;
    cursor: pointer;
    &:before {
      content: "Reset";
    }
  `

  return (
    <div>
      <Checkbox
        filter={props.filter}
        changeFilter={props.changeFilter}
        name="Graphic Design"
        color={props.colorscheme.accent1}
      />
      <Checkbox
        filter={props.filter}
        changeFilter={props.changeFilter}
        name="Motion Graphics"
        color={props.colorscheme.accent2}
      />
      <Checkbox
        filter={props.filter}
        changeFilter={props.changeFilter}
        name="Web Development"
        color={props.colorscheme.accent3}
      />
      <Reset
        onClick={() => props.changeFilter()}
      />
    </div>
  )
}

export const DynamicMenuContent = connect(
  ({main, portfolio}) => ({
    filter: portfolio.filter,
    colorscheme: main.colorscheme
  }),
  dispatch => ({
    changeFilter: filter => dispatch(changeFilter(filter))
  })
)(DynamicMenuContentView)

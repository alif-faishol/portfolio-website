import React from 'react'
import {connect} from 'react-redux'
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

export const DynamicMenuContent = props => {

  const CheckboxView = props => {
    const changeHandler = event => {
      props.changeFilter({
        [props.name]: event.target.checked
      })
    }
    return (
      <label>
        {props.name}
        <input
          name={props.id}
          type='checkbox'
          checked={
            props.filter[props.name] || props.filter[props.name] === undefined
              ? true
              : false
          }
          onChange={changeHandler}
        />
      </label>
    )
  }

  const Checkbox = connect(
    ({portfolio}) => ({
      filter: portfolio.filter
    }),
    dispatch => ({
      changeFilter: filter => dispatch(changeFilter(filter))
    })
  )(CheckboxView)

  return (
    <div>
      <Checkbox name="Graphic Design"/>
      <Checkbox name="Motion Graphics"/>
      <Checkbox name="Web Development"/>
    </div>
  )
}


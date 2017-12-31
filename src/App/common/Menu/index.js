import React from 'react'
import {connect} from 'react-redux'
import {toggleTutor} from '../../../action'

let Menu = ({dispatch, toggleShowed}) => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'grey'
    }}
  >
    <div>This is menu</div>
    <div>{toggleShowed ? 'True' : 'False'}</div>
    <button
      onClick={() => {
        dispatch(toggleTutor())}
      }
    >
      disable tutor
    </button>
  </div>
)

Menu = connect(
  (state) => ({toggleShowed: state.main})
)(Menu)

export default Menu

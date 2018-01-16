import {combineReducers} from 'redux'

const menuExpanded = (state=false, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return action.toBe ? action.toBe : !state
    default:
      return state
  }
}

export default combineReducers({
  menuExpanded
})

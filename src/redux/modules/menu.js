import {combineReducers} from 'redux'

const MENU_TOGGLE = 'App/Menu/MENU_TOGGLE'


const menuExpanded = (state=false, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return action.toBe ? action.toBe : !state
    default:
      return state
  }
}

export default combineReducers({
  menuExpanded
})


export const toggleMenu = to => ({
  type: MENU_TOGGLE,
  toBe: to
})

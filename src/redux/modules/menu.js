import {combineReducers} from 'redux'

const MENU_TOGGLE = 'App/Menu/MENU_TOGGLE'
const MENU_CONTENT_CHANGE = 'App/Menu/MENU_CONTENT_CHANGE'


const menuExpanded = (state=false, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return action.toBe ? action.toBe : !state
    default:
      return state
  }
}

const menuContent = (state="home", action) => {
  switch (action.type) {
    case MENU_CONTENT_CHANGE:
      return action.content
    default:
      return state
  }
}


export default combineReducers({
  menuExpanded,
  menuContent
})


export const toggleMenu = to => ({
  type: MENU_TOGGLE,
  toBe: to
})

export const changeMenuContent = content => ({
  type: MENU_CONTENT_CHANGE,
  content
})

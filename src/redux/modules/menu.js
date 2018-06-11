import {combineReducers} from 'redux'

const MENU_TOGGLE = 'App/Menu/MENU_TOGGLE'
const MENU_CONTENT_CHANGE = 'App/Menu/MENU_CONTENT_CHANGE'
const DYNAMIC_MENU_CONF = 'App/Menu/DYNAMIC_MENU_CONF'
const TITLE_CONF = 'App/Menu/TITLE_CONF'


const menuExpanded = (state=false, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return action.toBe !== undefined ? action.toBe : !state
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

const dynamicMenu = (state={
  name: "Settings",
  onClick: () => null,
  content: () => null,
}, action) => {
  switch (action.type) {
    case DYNAMIC_MENU_CONF:
      return {...state, ...action.conf}
    default:
      return state
  }
}

const title = (state="Alif Faishol", action) => {
  switch (action.type) {
    case TITLE_CONF:
      return action.title !== undefined ? action.title : "Alif Faishol"
    default:
      return state
  }
}


export default combineReducers({
  menuExpanded,
  menuContent,
  dynamicMenu,
  title
})


export const confTitle = title => ({
  type: TITLE_CONF,
  title
})

export const confDynamicMenu = conf => ({
  type: DYNAMIC_MENU_CONF,
  conf
})

export const toggleMenu = to => ({
  type: MENU_TOGGLE,
  toBe: to
})

export const changeMenuContent = content => ({
  type: MENU_CONTENT_CHANGE,
  content
})

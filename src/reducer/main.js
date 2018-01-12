import {combineReducers} from 'redux'
import getColorscheme from '../App/common/themes'

const showTutor = (state=true, action) => {
  switch (action.type) {
    case 'TOGGLE_TUTOR':
      return action.toBe ? action.toBe : !state
    default:
      return state
  }
}

const menuExpanded = (state=false, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return action.toBe ? action.toBe : !state
    default:
      return state
  }
}

const viewportSize = (state={
  height: window.innerHeight,
  width: window.innerWidth
}, action) => {
  if (action.type === 'UPDATE_VIEWPORT_SIZE') {
    return {...action.newSize}
  } else {
    return state
  }
}

const colorscheme = (state=getColorscheme('light'), action) => {
  switch (action.type) {
    case 'SWITCH_COLORSCHEME':
      return getColorscheme(action.colorscheme)
    default:
      return state
  }
}

export default combineReducers({
  showTutor,
  menuExpanded,
  viewportSize,
  colorscheme
})

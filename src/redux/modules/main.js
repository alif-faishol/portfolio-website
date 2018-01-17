import {combineReducers} from 'redux'
import getColorscheme from 'App/common/themes'

const TUTOR_TOGGLE = 'App/TUTOR_TOGGLE'
const COLORSCHEME_SWITCH = 'App/COLORSCHEME_SWITCH'
const VIEWPORT_SIZE_UPDATE = 'App/VIEWPORT_SIZE_UPDATE'


const showTutor = (state=true, action) => {
  switch (action.type) {
    case TUTOR_TOGGLE:
      return action.toBe ? action.toBe : !state
    default:
      return state
  }
}

const viewportSize = (state={
  height: window.innerHeight,
  width: window.innerWidth
}, action) => {
  if (action.type === VIEWPORT_SIZE_UPDATE) {
    return {...action.newSize}
  } else {
    return state
  }
}

const colorscheme = (state=getColorscheme('light'), action) => {
  switch (action.type) {
    case COLORSCHEME_SWITCH:
      return action.colorscheme
    default:
      return state
  }
}

export default combineReducers({
  showTutor,
  viewportSize,
  colorscheme
})


export const toggleTutor = to => ({
  type: TUTOR_TOGGLE,
  toBe: to
})

export const updateViewportSize = () => ({
  type: VIEWPORT_SIZE_UPDATE,
  newSize: {
    height: window.innerHeight,
    width: window.innerWidth
  }
})

export const switchColorscheme = colorscheme => ({
  type: COLORSCHEME_SWITCH,
  colorscheme: getColorscheme(colorscheme)
})

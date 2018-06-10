import {combineReducers} from 'redux'
import getColorscheme from 'App/common/themes'

// Action Types
const TUTOR_TOGGLE = 'App/TUTOR_TOGGLE'
const COLORSCHEME_SWITCH = 'App/COLORSCHEME_SWITCH'
const VIEWPORT_SIZE_UPDATE = 'App/VIEWPORT_SIZE_UPDATE'
const TRANSITION_STATUS_TOGGLE = 'App/TRANSITION_STATUS_TOGGLE'


// Reducers
const showTutor = (state=true, action) => {
  switch (action.type) {
    case TUTOR_TOGGLE:
      return action.status ? action.status : !state
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

const onTransition = (state=false, action) => {
  switch (action.type) {
    case TRANSITION_STATUS_TOGGLE:
      return action.status !== undefined ? action.status : !state
    default:
      return state
  }
}

export default combineReducers({
  showTutor,
  viewportSize,
  colorscheme,
  onTransition
})


// Action Creators
export const toggleTutor = status => ({
  type: TUTOR_TOGGLE,
  status
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

export const toggleTransitionStatus = status => ({
  type: TRANSITION_STATUS_TOGGLE,
  status
})

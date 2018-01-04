import store from './store.js'
import {updateViewportSize} from './action.js'

const resized = () => {
  store.dispatch(updateViewportSize())
}

export default () => {
  window.addEventListener('resize', resized)
}

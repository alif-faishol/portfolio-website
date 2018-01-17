import store from 'store'
import {updateViewportSize} from 'action'

const resized = () => {
  store.dispatch(updateViewportSize())
}

export default () => {
  window.addEventListener('resize', resized)
}

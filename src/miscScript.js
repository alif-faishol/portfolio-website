import store from 'redux/store'
import {updateViewportSize} from 'redux/modules/main'

const resized = () => {
  store.dispatch(updateViewportSize())
}

export default () => {
  window.addEventListener('resize', resized)
}

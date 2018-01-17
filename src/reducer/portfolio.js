import {combineReducers} from 'redux'

const data = (state={}, action) => (
  action.type === 'VALUE_PASSER'
    ? action.value
    : state
)

export default combineReducers({
  data
})

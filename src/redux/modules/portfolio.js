import {combineReducers} from 'redux'

const DATA_LOAD = 'App/Portfolio/DATA_LOAD'


const data = (state={}, action) => (
  action.type === DATA_LOAD
    ? action.value
    : state
)

export default combineReducers({
  data,
})


export const loadData = value => ({
  type: DATA_LOAD,
  value
})


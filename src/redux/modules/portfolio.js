import {combineReducers} from 'redux'

const DATA_LOAD = 'App/Portfolio/DATA_LOAD'
const LOADING_TOGGLE = 'App/Portfolio/LOADING_TOGGLE'


const items = (state={}, action) => (
  action.type === DATA_LOAD
    ? action.value
    : state
)

const loading = (state=true, action) => (
  action.type === LOADING_TOGGLE
    ? action.value !== undefined ? action.value : !state
    : state
)

export default combineReducers({
  items,
  loading
})


export const loadData = value => ({
  type: DATA_LOAD,
  value
})

export const toggleLoading = value => ({
  type: LOADING_TOGGLE,
  value
})


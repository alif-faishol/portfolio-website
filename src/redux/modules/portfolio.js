import {combineReducers} from 'redux'

const DATA_LOAD = 'App/Portfolio/DATA_LOAD'
const LOADING_TOGGLE = 'App/Portfolio/LOADING_TOGGLE'
const FILTER_CHANGE = 'App/Portfolio/FILTER_CHANGE'


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

const filter = (state={}, action) => {
  if(action.type === FILTER_CHANGE) {
    return action.value !== undefined
      ? {...state, ...action.value}
      : {}
  } else {
    return state
  }
}

export default combineReducers({
  items,
  loading,
  filter
})


export const loadData = value => ({
  type: DATA_LOAD,
  value
})

export const toggleLoading = value => ({
  type: LOADING_TOGGLE,
  value
})

export const changeFilter = value => ({
  type: FILTER_CHANGE,
  value
})


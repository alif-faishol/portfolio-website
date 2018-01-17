import {combineReducers} from 'redux'

const DATA_LOAD = 'App/Portfolio/DATA_LOAD'
const DATA_IS_LOADING = 'App/Portfolio/DATA_IS_LOADING'


const data = (state={}, action) => (
  action.type === DATA_LOAD
    ? action.value
    : state
)

const dataIsLoading = (state=true, action) => (
  action.type === DATA_IS_LOADING
    ? (action.forceTo !== undefined ? action.forceTo : !state)
    : state
)

export default combineReducers({
  data,
  dataIsLoading
})


export const loadData = value => ({
  type: DATA_LOAD,
  value
})

export const toggleLoading = forceTo => ({
  type: DATA_IS_LOADING,
  forceTo
})

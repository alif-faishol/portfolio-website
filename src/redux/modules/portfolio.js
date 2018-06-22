import {combineReducers} from 'redux'

const DATA_LOAD = 'App/Portfolio/DATA_LOAD'
const LOADING_TOGGLE = 'App/Portfolio/LOADING_TOGGLE'
const FILTER_CHANGE = 'App/Portfolio/FILTER_CHANGE'
const DETAILS_LOAD = 'App/Portfolio/ItemDetails/DETAILS_LOAD'
const DETAILS_TOGGLE = 'App/Portfolio/ItemDetails/DETAILS_TOGGLE'


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

const detailsData = (state={
  show: false,
  data: {}
}, action) => {
  switch(action.type) {
    case DETAILS_LOAD:
      return {
        ...state,
        data: action.value !== undefined ? action.value : {}
      }
    case DETAILS_TOGGLE:
      return {
        ...state,
        show: action.value !== undefined ? action.value : !state.show
      }
    default:
      return state
  }
}

export default combineReducers({
  items,
  loading,
  filter,
  detailsData
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

export const loadDetailsData = value => ({
  type: DETAILS_LOAD,
  value
})

export const toggleDetailsData = value => ({
  type: DETAILS_TOGGLE,
  value
})


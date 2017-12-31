import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const composedEnhanchers = compose(
  applyMiddleware(
    thunk
  )
)

const store = createStore(
  reducer,
  {},
  composedEnhanchers
)


// To use in development
//-----------------------------
console.log(store.getState())

store.subscribe(() =>
  console.log(store.getState())
)
//-----------------------------

export default store

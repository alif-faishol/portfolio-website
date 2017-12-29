import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {toggleTutor} from './action'

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

console.log(store.getState())

const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(toggleTutor())
store.dispatch(toggleTutor())

export default store

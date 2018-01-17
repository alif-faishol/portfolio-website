import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from 'redux/modules/reducer'

const composedEnhanchers = 
  (process.env.NODE_ENV === 'development'
    && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : false
    )  
  )
  || compose(
  applyMiddleware(
    thunk,
    
  )
)

const store = createStore(
  reducer,
  {},
  composedEnhanchers
)


// To use in development
//-----------------------------
if (process.env.NODE_ENV === 'development') {
  console.log(store.getState())

  store.subscribe(() =>
    console.log(store.getState())
  )
}
//-----------------------------

export default store

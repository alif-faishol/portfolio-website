import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducer from 'redux/modules/reducer';

export const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
const composedEnhanchers = (process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;
/* eslint-enable */

const store = createStore(
  connectRouter(history)(reducer),
  {},
  composedEnhanchers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);


// To use in development
//-----------------------------
if (process.env.NODE_ENV === 'development') {
  console.log(store.getState());
  store.subscribe(() => console.log(store.getState()));
}
//-----------------------------

export default store;

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'redux/store';
import App from './App';
import resizeHandler from './miscScript';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

resizeHandler();

registerServiceWorker();

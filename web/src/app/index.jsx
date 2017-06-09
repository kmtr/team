import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import router from './router';
import reducer from './reducers';

const basename = '/';
const browserHistory = createBrowserHistory({ basename });

/* eslint no-underscore-dangle: 0 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk),
  ),
);

function Root() {
  return (<Provider store={store}>
    <BrowserRouter basename={basename} history={browserHistory}>
      {router()}
    </BrowserRouter>
  </Provider>);
}

render(<Root />, document.getElementById('root'));

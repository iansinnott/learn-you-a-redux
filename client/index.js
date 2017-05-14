import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

// Import your routes so that you can pass them to the <Router /> component
import routes from './routes.js';
import store from './store.js';

if (process.env.NODE_ENV === 'development') {
  require('./exposeGlobals.js')(window);
}

render((
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
), document.getElementById('root'));

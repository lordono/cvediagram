import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import history from "./history"
import AppRoutes from './routes'

ReactDOM.render(
  <Router history={history}>
    <AppRoutes
      history={history}
    />
  </Router>
  , document.getElementById('root')
);

registerServiceWorker();

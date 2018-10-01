import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';

const AppRoutes = history => {
  return (
    <Switch>
      <Route path="/" component={Main} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import EventsList from './EventsList';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={EventsList} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

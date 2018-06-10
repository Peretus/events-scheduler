import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import EventsList from './EventsList';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={EventsList} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

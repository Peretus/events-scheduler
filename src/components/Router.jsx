import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import EventsList from './EventsList';
import App from './App';
import withFetchedEvents from './withFetchedEvents';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={withFetchedEvents(App)} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

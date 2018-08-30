import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';


const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/profile" component={Profile} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default (App);

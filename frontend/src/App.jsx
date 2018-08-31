import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import PrivateRoute from './containers/PrivateRoute';
import MoviePage from './containers/MoviePage';


const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/movie/:movieId" component={MoviePage} />
    <PrivateRoute path="/profile" component={Profile} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default (App);

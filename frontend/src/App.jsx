import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import PrivateRoute from './containers/PrivateRoute';
import MoviePage from './containers/MoviePage';
import AdminHome from './containers/admin/Home';
import AdminMovieHome from './containers/admin/AdminMovieHome';


const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/movie/:movieId" component={MoviePage} />
    <PrivateRoute path="/profile" component={Profile} />

    <PrivateRoute admin path="/admin/home" component={AdminHome} />
    <PrivateRoute admin path="/admin/movies/new" component={AdminHome} />
    <PrivateRoute admin path="/admin/movies/" component={AdminMovieHome} />

    <Route path="*" component={NotFound} />
  </Switch>
);

export default (App);

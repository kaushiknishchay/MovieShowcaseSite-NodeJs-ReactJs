import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNil } from 'lodash/lang';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import NotFound from '../components/NotFound';


class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component, authToken, isAdmin, admin, signInRequired, ...rest
    } = this.props;

    const isAuthenticated = !(isNil(authToken) || signInRequired);

    const renderRoute = (props) => {
      if (admin && isAuthenticated && !isAdmin) {
        return <NotFound />;
      }

      if (isAuthenticated) {
        return (<Component {...props} />);
      }
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location },
        }}
        />
      );
    };

    return (
      <Route {...rest} render={renderRoute} />
    );
  }
}


function initMapStateToProps(state) {
  const mapAuth = Map(state.auth);

  return {
    isAdmin: mapAuth.getIn(['isAdmin']),
    authToken: mapAuth.getIn(['authToken']),
    signInRequired: mapAuth.getIn(['signInRequired']),
  };
}

PrivateRoute.defaultProps = {
  isAdmin: false,
  admin: false,
  signInRequired: true,
  authToken: null,
};

PrivateRoute.propTypes = {
  admin: PropTypes.bool,
  isAdmin: PropTypes.bool,
  signInRequired: PropTypes.bool,
  authToken: PropTypes.string,
  component: PropTypes.instanceOf(Object).isRequired,
};


export default withRouter(connect(initMapStateToProps)(PrivateRoute));

import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNil } from 'lodash/lang';
import PropTypes from 'prop-types';


class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component, authToken, signInRequired, ...rest
    } = this.props;

    const isAuthenticated = !(isNil(authToken) || signInRequired);

    const renderRoute = (props) => {
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
  return {
    authToken: state.getIn(['auth', 'authToken']),
    signInRequired: state.getIn(['auth', 'signInRequired']),
  };
}

PrivateRoute.defaultProps = {
  signInRequired: true,
  authToken: null,
};

PrivateRoute.propTypes = {
  signInRequired: PropTypes.bool,
  authToken: PropTypes.string,
  component: PropTypes.instanceOf(Object).isRequired,
};


export default withRouter(connect(initMapStateToProps)(PrivateRoute));

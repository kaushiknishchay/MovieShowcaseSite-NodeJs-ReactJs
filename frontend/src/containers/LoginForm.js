/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Typography from '@material-ui/core/Typography/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { isNil } from 'lodash/lang';
import { doLogin } from '../actions/index';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }


  handleInputChange = attribute => (event) => {
    this.setState({
      [attribute]: event.target.value,
    });
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { doLoginAction } = this.props;
    doLoginAction(email, password);
  };

  render() {
    const { email, password } = this.state;
    const {
      onClose, loginErrors: errors,
      userAuthToken, loginLoading,
    } = this.props;

    if (!isNil(userAuthToken)) {
      onClose();
      return null;
    }

    const isLoading = loginLoading;

    return (
      <Dialog
        fullWidth
        open
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
          {
            !errors.isEmpty()
              ? (
                <Typography variant="body1" color="error">
                  {errors.toArray().toString()}
                </Typography>
              )
              : <DialogContentText color="error" />
          }
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={this.handleInputChange('email')}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={this.handleInputChange('password')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>

          {
            !isLoading && ([
              <Button onClick={onClose} key="cancelLogin">
                Cancel
              </Button>,
              <Button onClick={this.handleLoginSubmit} color="primary" key="submitLogin">
                Login
              </Button>,
            ])
          }
          {isLoading && <CircularProgress size={20} />}
        </DialogActions>
      </Dialog>
    );
  }
}

LoginForm.defaultProps = {
  userAuthToken: null,
};
LoginForm.propTypes = {
  loginLoading: PropTypes.bool.isRequired,
  userAuthToken: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  loginErrors: PropTypes.instanceOf(Immutable.List).isRequired,
  doLoginAction: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    loginLoading: state.getIn(['auth', 'loginLoading']),
    userAuthToken: state.getIn(['auth', 'authToken']),
    loginErrors: state.getIn(['auth', 'loginErrors']),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    doLoginAction: doLogin,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginForm);

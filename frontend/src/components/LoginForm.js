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
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import Typography from '@material-ui/core/Typography/Typography';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
      isLoading: false,
    };
  }


  handleInputChange = attribute => (event) => {
    this.setState({
      [attribute]: event.target.value,
    });
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      const { email, password } = this.state;
      axios({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        data: {
          email,
          password,
        },
      })
        .then((response) => {
          console.log(response);
          this.setState({
            authToken: response.data.token,
            isLoading: false,
            errors: [],
          });
        })
        .catch((reason) => {
          this.setState({
            isLoading: false,
            errors: reason.response.data.errors,
          });
        });
    }, 2000);
  };

  render() {
    const { onClose } = this.props;
    const { isLoading, errors } = this.state;

    return (
      <Dialog
        open
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
          {
            !isEmpty(errors)
              ? (
                <Typography variant="body1" color="error">
                  {errors.toString()}
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
            onChange={this.handleInputChange('email')}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
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

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;

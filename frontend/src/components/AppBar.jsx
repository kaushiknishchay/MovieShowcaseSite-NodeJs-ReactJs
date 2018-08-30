import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Button from '@material-ui/core/Button/Button';
import AppBar from '@material-ui/core/AppBar';
import connect from 'react-redux/es/connect/connect';
import isNil from 'lodash/isNil';

import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { doLogoutAction } from '../actions';


class CustomAppBar extends Component {
  state = {
    showLoginModal: false,
    profileMenuAnchor: null,
  };

  handleMenu = (event) => {
    event.preventDefault();
    this.setState({ profileMenuAnchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ profileMenuAnchor: null });
  };

  handleModalClose = type => event => this.setState({ showLoginModal: type === 'open', profileMenuAnchor: null });

  handleLogOut = (e) => {
    e.preventDefault();
    const { doLogout } = this.props;
    doLogout();
  };


  render() {
    const { userAuthToken, isAdmin } = this.props;
    const isLoggedIn = !isNil(userAuthToken);

    const { profileMenuAnchor, showLoginModal } = this.state;
    const open = Boolean(profileMenuAnchor);

    return (
      <AppBar
        position="fixed"
        color="primary"
      >
        <Toolbar>
          <IconButton
            style={{
              marginLeft: -12,
              marginRight: 20,
            }}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            style={{
              flexGrow: 1,
            }}
          >
            Photos
          </Typography>
          {
            !isLoggedIn
            && (
              <Button
                color="inherit"
                onClick={this.handleModalClose('open')}
              >
                Login
              </Button>
            )
          }
          {
            isLoggedIn && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={profileMenuAnchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  {
                    isAdmin
                    && (
                      <MenuItem onClick={this.handleClose}>
                        Admin Panel
                      </MenuItem>
                    )
                  }
                  <MenuItem>
                    <Link to="/profile">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={this.handleLogOut}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
        </Toolbar>
        {
          (showLoginModal) && (
            <LoginForm onClose={this.handleModalClose('close')} />
          )}
      </AppBar>
    );
  }
}

CustomAppBar.defaultProps = {
  userAuthToken: null,
  isAdmin: false,
};

CustomAppBar.propTypes = {
  userAuthToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  doLogout: PropTypes.func.isRequired,
};


function initMapStateToProps(state) {
  return {
    isAdmin: state.getIn(['auth', 'isAdmin']),
    userAuthToken: state.getIn(['auth', 'authToken']),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    doLogout: doLogoutAction,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CustomAppBar);

import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Button from '@material-ui/core/Button/Button';
import AppBar from '@material-ui/core/AppBar';
import LoginForm from './LoginForm';


class CustomAppBar extends Component {
  state = {
    showLoginModal: false,
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const isLoggedIn = false;

    const { anchorEl, showLoginModal } = this.state;
    const open = Boolean(anchorEl);

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
                onClick={() => {
                  this.setState({
                    showLoginModal: true,
                  });
                }}
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
                  anchorEl={anchorEl}
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
                  <MenuItem onClick={this.handleClose}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    My account
                  </MenuItem>
                </Menu>
              </div>
            )}
        </Toolbar>
        {
          showLoginModal && (
            <LoginForm onClose={() => {
              this.setState({
                showLoginModal: false,
              });
            }}
            />
          )}
      </AppBar>
    );
  }
}

CustomAppBar.propTypes = {};

export default CustomAppBar;

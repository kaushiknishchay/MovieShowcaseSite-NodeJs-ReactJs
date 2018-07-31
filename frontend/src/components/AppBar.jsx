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


class CustomAppBar extends Component {
  state = {
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

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar
        position="static"
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
              <Button color="inherit">
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
      </AppBar>
    );
  }
}

CustomAppBar.propTypes = {};

export default CustomAppBar;

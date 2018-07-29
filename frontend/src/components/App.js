import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Typography from '@material-ui/core/Typography/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


class App extends Component {
  render() {
    const auth = true;
    return (
      <div>
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
            {auth && (
              <div>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
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
        <div className="content">
          <p className="App-intro">
            To get started, edit
            <code>
              src/App.js
            </code>
            and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;

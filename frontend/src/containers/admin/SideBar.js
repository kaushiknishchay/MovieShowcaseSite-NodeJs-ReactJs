import React, { Component } from 'react';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid/Grid';


import CustomPaper from '../../components/ui/CustomPaper';


class AdminSideBar extends Component {
  render() {
    return (
      <Grid item xs={12} lg={3}>
        <CustomPaper dark elevation={0}>
          <List component="nav">
            <Link to="/admin/home">
              <ListItem button>
                <ListItemText
                  primary="Dashboard"
                  className="white-text"
                />
              </ListItem>
            </Link>
            <Divider />
            <Link to="/admin/movies">
              <ListItem button>
                <ListItemText
                  primary="All Movies"
                  className="white-text"
                />
              </ListItem>
            </Link>
            <Link to="/admin/movies/new">
              <ListItem button>
                <ListItemText
                  primary="Create New Movie"
                  className="white-text"
                />
              </ListItem>
            </Link>
            <Divider />
          </List>
        </CustomPaper>
      </Grid>
    );
  }
}

AdminSideBar.propTypes = {};

export default AdminSideBar;

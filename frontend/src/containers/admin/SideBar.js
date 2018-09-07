import React, { Component } from 'react';
import CustomPaper from '../../components/ui/CustomPaper';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid/Grid';


class AdminSideBar extends Component {
  render() {
    return (
      <Grid item xs={3}>
        <CustomPaper>
          <List component="nav">
            <Link to="/admin/home">
              <ListItem button>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Divider />
            <Link to="/admin/movies">
              <ListItem button>
                <ListItemText primary="All Movies" />
              </ListItem>
            </Link>
            <Link to="/admin/movies/new">
              <ListItem button>
                <ListItemText primary="Create New Movie" />
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

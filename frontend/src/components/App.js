import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CustomAppBar from './AppBar';
import '../styles/css/App.css';


class App extends Component {
  render() {
    return (
      <div>
        <CustomAppBar />
        <div className="content">
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Card style={{
                display: 'flex',
                flex: 1,
              }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                >
                  <CardContent style={{
                    flex: '1 0 auto',
                  }}
                  >
                    <Typography variant="headline">Live From Space</Typography>
                    <Typography variant="subheading" color="textSecondary">
                      This impressive paella is a perfect party d
                      ish and a fun meal to cook together wit
                      ish and a fun meal to cook together wit
                      ish and a fun meal to cook together wit
                      ish and a fun meal to cook together wit
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  style={{
                    width: 151,
                    minWidth: 151,
                    height: 151,
                  }}
                  image="https://picsum.photos/151/151/?random"
                  title="Live from space album cover"
                />
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

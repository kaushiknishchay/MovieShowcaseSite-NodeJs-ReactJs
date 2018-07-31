import React, { Component } from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import CustomAppBar from './AppBar';
import '../styles/css/App.css';
import MovieCard from './MovieCard';


class App extends Component {
  render() {
    return (
      <div>
        <CustomAppBar />
        <div className="content">
          <Grid
            container
            spacing={24}
            style={{
              padding: '4rem 10rem',
            }}
          >
            {
              _.map(_.range(14), i => (
                <MovieCard
                  name={`Movie ${i}`}
                  desc={`Something ${i}`}
                  poster={'https://picsum.photos/300/300/?random&' + i}
                />
              ))
            }

          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

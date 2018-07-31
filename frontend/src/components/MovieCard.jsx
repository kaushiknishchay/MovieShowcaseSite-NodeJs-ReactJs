import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';


class MovieCard extends Component {
  render() {
    const {
      name, desc, poster, grid,
    } = this.props;
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
        <Card style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
        }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            <CardContent style={{
              flex: '1 0 auto',
              minWidth: 200,
            }}
            >
              <Typography variant="headline">
                {name}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {desc}
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            style={{
              width: 200,
              minWidth: 200,
              minHeight: 200,
            }}
            image={poster}
            title={name}
          />
        </Card>
      </Grid>
    );
  }
}

MovieCard.defaultProps = {
  desc: null,
  poster: '',
  grid: 4,
};

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  poster: PropTypes.string,
};

export default MovieCard;

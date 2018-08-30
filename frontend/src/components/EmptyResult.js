import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import PropTypes from 'prop-types';
import emptyMovieIcon from '../assets/images/empty_movie.svg';


const EmptyResult = ({ title, subHeading }) => (
  <Paper
    style={{
      padding: '2em',
    }}
    square
    elevation={0}
  >
    <div
      style={{
        margin: 'auto',
        width: '300px',
        height: 260,
        overflow: 'hidden',
        marginBottom: 30,
      }}
    >
      <CardMedia
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: 400,
          width: '300px',
          height: '300px',
          margin: 'auto',
        }}
        image={emptyMovieIcon}
        title={title}
      />
    </div>
    <Typography
      align="center"
      variant="headline"
      noWrap
      gutterBottom
    >
      {title}
    </Typography>
    <Typography
      align="center"
      variant="subheading"
      gutterBottom
    >
      {subHeading}
    </Typography>
  </Paper>
);

EmptyResult.defaultProps = {
  title: 'No Movies found.',
  subHeading: 'There are no movies for the selected filters.',
};

EmptyResult.propTypes = {
  title: PropTypes.string,
  subHeading: PropTypes.string,
};


export default EmptyResult;

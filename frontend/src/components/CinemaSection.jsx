import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import CinemaExpansion from '../containers/CinemaExpansion';
import CustomPaper from './ui/CustomPaper';


const CinemaSection = ({
  cinemas,
  movieId,
}) => (
  !isEmpty(cinemas) ? (
    <CustomPaper
      elevation={0}
      dark
    >
      <Typography
        color="inherit"
        variant="headline"
      >
          Cinemas
      </Typography>
      <br />
      <Grid container>
        {
            map(cinemas, cinema => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                key={cinema._id}
              >
                <CinemaExpansion
                  cinema={cinema}
                  movieId={movieId}
                />
              </Grid>
            ))
          }
      </Grid>
    </CustomPaper>
  )
    : null
);

CinemaSection.propTypes = {
  cinemas: PropTypes.array,
  movieId: PropTypes.string.isRequired,
};


export default CinemaSection;

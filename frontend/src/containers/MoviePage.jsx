/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/lang';
import map from 'lodash/map';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Avatar from '@material-ui/core/Avatar/Avatar';
import HeartIcon from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip/Chip';
import Icon from '@material-ui/core/Icon/Icon';
import Button from '@material-ui/core/Button';

import Selectors from '../selectors';
import NotFound from '../components/NotFound';
import PageBase from '../components/PageBase';
import CustomPaper from '../components/ui/CustomPaper';
import CastAvatar from '../components/CastAvatar';
import CinemaSection from '../components/CinemaSection';


class MoviePage extends Component {
  render() {
    const { movieInfo } = this.props;
    if (isEmpty(movieInfo)) {
      return (<NotFound />);
    }

    const {
      censorRating, genre, languages,
      duration, releaseDate,
      cast,
    } = movieInfo;
    return (
      <PageBase>
        <div className="content col">
          <CustomPaper
            dark
            elevation={0}
          >
            <Grid
              container
              spacing={40}
              style={{
                width: 'calc(100vw - 80px)',
              }}
            >
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                lg={3}
              >
                <CardMedia
                  component="div"
                  style={{
                    height: '100%',
                    maxHeight: 400,
                    minHeight: 400,
                    borderRadius: 4,
                  }}
                  image={movieInfo.poster}
                  title={movieInfo.name}
                >
                  {
                    !isEmpty(movieInfo.trailer)
                    && (
                      <div className="trailer__play_icon">
                        <a href={movieInfo.trailer} target="_blank" rel="noopener noreferrer">
                          <Icon>
                            play_arrow
                          </Icon>
                        </a>
                      </div>
                    )
                  }
                </CardMedia>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                md={8}
                lg={9}
              >
                <div style={{
                  height: 60,
                  float: 'right',
                  display: 'block',
                  textAlign: 'right',
                }}
                >
                  <Button
                    variant="extendedFab"
                    aria-label="Book Tickets"
                    className="book_ticket__button"
                  >
                    Book Tickets
                    <Icon>
                      local_movies
                    </Icon>
                  </Button>
                </div>
                <Typography
                  variant="display1"
                  gutterBottom
                  color="inherit"
                >
                  {movieInfo.name}
                  <div
                    style={{
                      display: 'inline-block',
                      margin: '0 1em',
                    }}
                  >
                    <Chip
                      classes={{
                        root: 'favorite__container',
                        avatar: 'favorite__container__icon',
                      }}
                      avatar={(
                        <Avatar>
                          <HeartIcon />
                        </Avatar>
                      )}
                      label={`${(movieInfo.userRating * 10).toFixed(0)}%`}
                      color="secondary"
                    />
                  </div>
                </Typography>
                <Typography
                  color="inherit"
                  variant="subheading"
                  gutterBottom
                >
                  {`${censorRating}  |  ${genre.join(', ')}  |  ${languages.join(', ')}`}
                </Typography>
                <br />

                <Typography
                  variant="subheading"
                  color="inherit"
                  gutterBottom
                >
                  {`Release Date: ${new Date(releaseDate).toDateString()}`}
                  <br />
                  {`Duration: ${duration}min`}
                </Typography>
                <br />

                {
                  !isEmpty(movieInfo.synopsis) && (
                    <div
                      style={{
                        display: 'block',
                        marginBottom: '1em',
                      }}
                    >
                      <Typography
                        variant="headline"
                        gutterBottom
                        color="inherit"
                      >
                        Synopsis
                      </Typography>
                      <Typography
                        variant="body1"
                        color="inherit"
                        gutterBottom
                      >
                        {movieInfo.synopsis}
                      </Typography>
                    </div>
                  )
                }

                {
                  !isEmpty(cast) && (
                    <div
                      style={{
                        display: 'block',
                        marginBottom: '1em',
                      }}
                    >
                      <Typography
                        variant="headline"
                        color="inherit"
                        gutterBottom
                      >
                        Cast
                      </Typography>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: 880,
                          display: 'flex',
                          overflowX: 'scroll',
                          marginBottom: '1em',
                        }}
                      >
                        {
                          map(cast, c => <CastAvatar key={c.name} cast={c} />)
                        }
                      </div>
                    </div>)
                }
              </Grid>
            </Grid>
          </CustomPaper>
          <CinemaSection
            cinemas={movieInfo.cinemas}
            movieId={movieInfo._id}
          />
        </div>
      </PageBase>
    );
  }
}

MoviePage.propTypes = {
  movieInfo: PropTypes.object.isRequired,
};


function initMapStateToProps(state, ownProps) {
  return {
    movieInfo: Selectors.getMovieById(ownProps.match.params.movieId)(state),
  };
}

export default connect(initMapStateToProps, null)(MoviePage);

/* eslint-disable react/forbid-prop-types */
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
import Selectors from '../selectors';
import NotFound from '../components/NotFound';
import PageBase from '../components/PageBase';
import CustomPaper from '../components/ui/CustomPaper';


class MoviePage extends Component {
  render() {
    const { movieInfo } = this.props;
    if (isEmpty(movieInfo)) {
      return (<NotFound />);
    }

    const {
      censorRating, genre, languages,
      duration,
      cast,
    } = movieInfo;
    return (
      <PageBase>
        <div className="content">
          <CustomPaper>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={5} md={4} lg={3}>
                <CardMedia
                  component="img"
                  height="450"
                  image={movieInfo.poster}
                  title={movieInfo.name}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={8} lg={9}>
                <Typography
                  variant="display2"
                  gutterBottom
                >
                  {movieInfo.name}
                </Typography>
                <Typography
                  variant="subheading"
                  gutterBottom
                >
                  {`${censorRating}  |  ${genre.join(', ')}  |  ${languages.join(', ')} | ${duration}`}
                </Typography>
                <div
                  style={{
                    display: 'block',
                    marginBottom: '1em',
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
                <br />

                <Typography
                  variant="headline"
                  gutterBottom
                >
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
                      >
                        Synopsis
                      </Typography>
                      <Typography
                        variant="body1"
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
                        gutterBottom
                      >
                        Cast
                      </Typography>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          overflowX: 'scroll',
                          marginBottom: '1em',
                        }}
                      >
                        {
                          map(cast, (c) => {
                            let initials = c.name.match(/\b\w/g) || [];
                            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                            if (!c.photo) {
                              return (
                                <Avatar
                                  key={c.name}
                                  alt={c.name}
                                  src={c.photo}
                                  style={{
                                    height: 60,
                                    width: 60,
                                    margin: 5,
                                  }}
                                >
                                  {initials}
                                </Avatar>
                              );
                            }
                            return (
                              <Avatar
                                key={c.name}
                                alt={c.name}
                                src={c.photo}
                                style={{
                                  height: 60,
                                  width: 60,
                                  margin: 10,
                                }}
                              />);
                          })
                        }
                      </div>
                    </div>)
                }
                {JSON.stringify(movieInfo)}
              </Grid>
            </Grid>
          </CustomPaper>
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

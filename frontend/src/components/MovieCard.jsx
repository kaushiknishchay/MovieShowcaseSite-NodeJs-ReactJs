import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip/Chip';
import Avatar from '@material-ui/core/Avatar/Avatar';
import HeartIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';


class MovieCard extends Component {
  render() {
    const {
      name, userRating,
      poster, language,
      censorRating, genre,
      movieId,
    } = this.props;

    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={3}
        className="movie_card"
      >
        <Link to={`/movie/${movieId}`}>
          <Card className="movie_card__container">
            <div className="movie_card__favorite__container">
              <HeartIcon />
            </div>
            <CardMedia
              style={{
                width: '100%',
                height: '300px',
                minWidth: 250,
                minHeight: 250,
              }}
              image={poster}
              title={name}
            />

            <CardContent
              className="movie_card__container__content"
            >
              <Typography
                variant="title"
                align="left"
                gutterBottom
                noWrap
              >
                {name}
              </Typography>

              <Typography
                variant="caption"
                color="textSecondary"
                gutterBottom
              >
                {`${censorRating} | ${genre} | ${language}`}
              </Typography>

              <Typography
                variant="caption"
                noWrap
                gutterBottom
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
                  label={`${(userRating * 10).toFixed(0)}%`}
                  color="secondary"
                />
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  }
}

MovieCard.defaultProps = {
  poster: '',
  language: 'English',
  censorRating: 'UA',
  genre: 'Action',
  userRating: 0,
};

MovieCard.propTypes = {
  movieId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  language: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  genre: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  censorRating: PropTypes.string,
  userRating: PropTypes.number,
  poster: PropTypes.string,
};

export default MovieCard;

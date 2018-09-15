/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import map from 'lodash/map';
import intersection from 'lodash/intersection';
import filter from 'lodash/filter';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/css/App.css';
import { bindActionCreators } from 'redux';
import MovieCard from '../components/MovieCard';
import EmptyResult from '../components/EmptyResult';
import { fetchMovieList } from '../actions';
import Selectors from '../selectors';


class MovieGridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
    };
    this.perPageItemCount = 6;
  }

  componentDidMount() {
    const { fetchMovieListTask } = this.props;
    fetchMovieListTask();
  }

  fetchMoreMovies = () => {
    setTimeout(() => {
      this.setState(prevState => ({
        pageNum: prevState.pageNum + 1,
      }));
    }, 100);
  };

  render() {
    const {
      pageNum,
    } = this.state;

    const {
      checkedLanguages,
      checkedGenre,
      moviesList: wholeMovieList,
      languageList, genreList,
    } = this.props;

    const checkedLanguagesValues = checkedLanguages.map(lang => languageList[lang]);

    const checkedGenresValues = checkedGenre.map(genre => genreList[genre]);

    let moviesToShow = wholeMovieList.slice(0, this.perPageItemCount * pageNum);

    if (checkedLanguages.length > 0 || checkedGenre.length > 0) {
      moviesToShow = filter(
        wholeMovieList,
        (movie) => {
          const genreMatching = intersection(movie.genre, checkedGenresValues);
          const langMatching = intersection(movie.languages, checkedLanguagesValues);

          if (checkedGenre.length === 0) return (langMatching.length > 0);
          if (checkedLanguages.length === 0) return (genreMatching.length > 0);
          return (langMatching.length > 0 && genreMatching.length > 0);
        },
      );
    }

    const hasMoreMovies = moviesToShow.length < wholeMovieList.length
      && checkedLanguages.length === 0
      && checkedGenre.length === 0;


    return (
      <InfiniteScroll
        dataLength={moviesToShow.length}
        next={this.fetchMoreMovies}
        hasMore={hasMoreMovies}
        loader={(
          <div className="infinite-scroll-loading__wrap">
            <CircularProgress />
          </div>
        )}
      >
        <Grid
          className="content__main"
          container
          spacing={24}
          style={{
            padding: '0rem 2rem',
          }}
        >
          {
            moviesToShow.length === 0 && (
              <Grid
                item
                xs={12}
              >
                <EmptyResult />
              </Grid>
            )
          }

          {
            map(moviesToShow, movie => (
              <MovieCard
                key={movie._id}
                movieId={movie._id}
                name={`${movie.name}`}
                censorRating={movie.censorRating}
                genre={movie.genre}
                language={movie.languages}
                poster={movie.poster}
                userRating={movie.userRating}
              />
            ))
          }
        </Grid>
      </InfiniteScroll>
    );
  }
}

function initMapStateToProps(state) {
  return {
    moviesList: Selectors.getAllMovies(state),
    languageList: Selectors.getLanguageList(state),
    genreList: Selectors.getGenreList(state),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMovieListTask: fetchMovieList,
  }, dispatch);
}

MovieGridContainer.propTypes = {
  fetchMovieListTask: PropTypes.func.isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    cast: PropTypes.array,
    censorRating: PropTypes.string,
    cinemas: PropTypes.array,
    duration: PropTypes.number,
    genre: PropTypes.array,
    languages: PropTypes.array,
    name: PropTypes.string,
    poster: PropTypes.string,
    synopsis: PropTypes.string,
    trailer: PropTypes.string,
    releaseDate: PropTypes.string,
    userRating: PropTypes.number,
  })).isRequired,
  checkedLanguages: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkedGenre: PropTypes.arrayOf(PropTypes.number).isRequired,
  languageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  genreList: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default connect(initMapStateToProps, initMapDispatchToProps)(MovieGridContainer);

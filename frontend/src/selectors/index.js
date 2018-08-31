import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import { Map } from 'immutable';


const getAllMovies = state => Map(state.movie).get('moviesList').toJS();
const getLanguageList = state => Map(state.movie).get('languageList').toJS();
const getGenreList = state => Map(state.movie).get('genreList').toJS();


const getMovieById = movieId => createSelector(
  getAllMovies,
  (allMovies) => {
    try {
      const result = filter(allMovies, { _id: movieId });
      if (result.length > 0) {
        return result[0];
      }
      return {};
    } catch (e) {
      return {};
    }
  },
);


export default {
  getMovieById,
  getAllMovies,
  getLanguageList,
  getGenreList,
};

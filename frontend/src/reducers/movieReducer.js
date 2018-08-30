import { fromJS } from 'immutable';


const initialState = fromJS({
  moviesList: [],
  languageList: ['English', 'Hindi', 'Tamil', 'Kannada', 'Marathi'],
  genreList: ['Action', 'Adventure', 'Romance', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller'],
  movieFetchErrors: [],
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MOVIELIST_SUCCESS':
      return state.merge({
        moviesList: payload,
      });
    case 'MOVIELIST_ERROR':
      return state.merge({
        movieFetchErrors: payload.errors,
      });
    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

export default rootReducer;

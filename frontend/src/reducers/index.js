import { combineReducers } from 'redux-immutable';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

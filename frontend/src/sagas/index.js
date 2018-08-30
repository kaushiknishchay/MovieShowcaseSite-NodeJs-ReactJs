import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import loginSaga from './loginSaga';
import movieSaga from './movieSaga';


function* rootSaga() {
  yield fork(mySaga);
  yield fork(loginSaga);
  yield fork(movieSaga);
}

export default rootSaga;

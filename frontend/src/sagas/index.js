import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import loginSaga from './loginSaga';

function* rootSaga() {
  yield fork(mySaga);
  yield fork(loginSaga);
}

export default rootSaga;

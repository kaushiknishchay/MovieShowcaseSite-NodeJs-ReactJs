import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../service';


const sagaKey = 'MOVIELIST_';

function* myTask(action) {
  try {
    const response = yield call(API.fetchMovies);

    yield put({
      type: `${sagaKey}SUCCESS`,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: `${sagaKey}ERROR`,
      payload: {
        errors: e.response.data.errors,
      },
    });
  }
}

function* mySaga() {
  yield takeLatest('FETCH_MOVIELIST', myTask);
}

export default mySaga;

import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../service';
import StorageUtil from '../utils/storage';


const sagaKey = 'LOGIN_';

function* logoutTask(action) {
  yield StorageUtil.removeToken();
}

function* myTask(action) {
  try {
    yield put({
      type: `${sagaKey}LOADING`,
    });

    const { payload: { email, password } } = action;

    const response = yield call(API.login, email, password);

    yield put({
      type: `${sagaKey}SUCCESS`,
      payload: {
        token: response.data.token,
        isAdmin: response.data.isAdmin,
      },
    });

    StorageUtil.saveToken(response.data.token);
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
  yield takeLatest('LOGIN_INITIATE', myTask);
  yield takeLatest('LOGOUT_SUCCESS', logoutTask);
}

export default mySaga;

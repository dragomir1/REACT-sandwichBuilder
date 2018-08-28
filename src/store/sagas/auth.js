// call is a function which allows you to call some function on some object
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga (action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  // yield localStorage.removeItem('token');
  // yield localStorage.removeItem('expirationDate');
  // yield localStorage.removeItem('userId');
  yield put (actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogOut());
}

export function* authCheckStateSaga (action) {
  const token = yield localStorage.getItem('token');
  if(!token) {
    yield put(actions.authLogOut());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if(expirationDate < new Date()) {
      yield put(actions.authLogOut());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}


export function* authUserSaga (action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDfIc42AV3EpNaIGltjsQyJ3-DKmI1sjVw';
  if(!action.isSignUp) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDfIc42AV3EpNaIGltjsQyJ3-DKmI1sjVw';
  }

  try {
    const response = yield axios.post(url, authData);

    yield localStorage.setItem('token', response.data.idToken);
    // new Date(new Date().getTime() + response.data.expiresIn * 1000); this code turns the date back into an object
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));

  } catch (error) {
    yield put (actions.authFail(error.response.data.error));
  }
}

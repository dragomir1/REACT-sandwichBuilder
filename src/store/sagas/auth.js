import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/index';

export function* logoutSaga (action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put (actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogOut());
}


export function* authUserSaga (action) {
  yield put(actions.authStart());

    const authData = {
      email: action.email,
      password: action.password,
      isSignUp: isSignUp,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDfIc42AV3EpNaIGltjsQyJ3-DKmI1sjVw';
    if(!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDfIc42AV3EpNaIGltjsQyJ3-DKmI1sjVw';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.idToken);
        // new Date(new Date().getTime() + response.data.expiresIn * 1000); this code turns the date back into an object
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));

      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };

import { logoutSaga } from './auth';

// takeEvery allows us to listen to certain actinos and do something when they occur.  takes two arguments. the first one is the action we are listening for.  the second is the generator we want to execute when this action occurs.
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}

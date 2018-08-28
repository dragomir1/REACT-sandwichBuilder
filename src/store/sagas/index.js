import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';

import {
  initialIngredientsSaga
} from './sandwichBuilder';

import {
  purchaseSandwichWhenClickInContactFormSaga,
  fetchOrdersSaga
} from './order';

// takeEvery allows us to listen to certain actinos and do something when they occur.  takes two arguments. the first one is the action we are listening for.  the second is the generator we want to execute when this action occurs.
// all is a function that runs multiple tasks simultaneously.
// takeLatest executes the latest action.

import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchSandwichBuilder() {
  yield takeEvery(actionTypes.INITIAL_INGREDIENTS, initialIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCH_SAND_CLICK_IN_CONTACTFORM, purchaseSandwichWhenClickInContactFormSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);

}

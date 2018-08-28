import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/index';
import axios from 'axios';


export function* initialIngredientsSaga (action) {
  const response = yield axios.get('https://react-sandwich-builder.firebaseio.com/Ingredients.json');
  try {
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFail());
  }
}

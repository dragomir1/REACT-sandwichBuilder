import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  // this is for the spinner
  loading: false,
  // this error prop is if the application is not useable at all.  it all breaks.
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.75,
  ham: 1.0,
  tomato: 0.38,
  cheese: 0.75
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredientRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngredientsRemove = updateObject(state.ingredients, updatedIngredientRemove);
  const updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedStateRemove);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4
  });
};

const fetchIngredientsFail = (state, action) => {
  return updateObject(state, {
    error: true
  });
};


const reducer = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.ADD_INGREDIENT: return addIngredient( state, action);

  case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

  case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);

  case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action);

  default:
    return state;
  }
};


export default reducer;

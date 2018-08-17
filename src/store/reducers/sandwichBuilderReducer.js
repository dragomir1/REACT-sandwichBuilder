import * as actionTypes from '../actions/actionTypes';

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

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.ADD_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
  case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

    };
  case actionTypes.SET_INGREDIENTS:
    return {
      ...state,
      ingredients: action.ingredients,
      // ingredients: {
      //   lettuce: action.ingredients.lettuce,
      //   tomato: action.ingredients.tomato,
      //   cheese: action.ingredients.cheese,
      //   ham: action.ingredients.ham
      // },
      error: false,
      totalPrice: 4
    };
  case actionTypes.FETCH_INGREDIENTS_FAIL:
    return {
      ...state,
      error: true
    };
  default:
    return state;
  }
};


export default reducer;

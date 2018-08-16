import * as actionTypes from '../actions/actions';

const initialState = {
  ingredients: {
    salad: 0,
    ham: 0,
    tomato: 0,
    cheese: 0
  },
  totalPrice: 0,
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
  default:
    return state;
  }


};


export default reducer;

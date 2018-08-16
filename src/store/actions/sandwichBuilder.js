import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

// interal only
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  };
};

export const initialIngredients = () => {
  return dispatch => {
    axios.get('https://react-sandwich-builder.firebaseio.com/Ingredients.json')
      .then(response => {
        // "data" is an object on the response.  data object contains our ingredients info.
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFail);
      });
  };
};

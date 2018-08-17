import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const purchaseSandwichSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseSandwichFail = (error) => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_FAIL,
    error: error
  };
};

export const purchaseRedirectOnceUserClickedOrder = () => {
  return {
    type: actionTypes.PURCHASE_REDIRECT_AFTER_CLICKING_ORDER
  };
};

export const purchaseSandwichStart = () => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_START
  };
};

export const purchaseSandwichWhenClickInContactForm = (orderData) => {
  return dispatch => {
    dispatch(purchaseSandwichStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseSandwichSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseSandwichFail(error));
      });

  };
};

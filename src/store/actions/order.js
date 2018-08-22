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

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json?auth=' + token)
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
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

export const purchaseSandwichWhenClickInContactForm = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseSandwichStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseSandwichSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseSandwichFail(error));
      });
  };
};

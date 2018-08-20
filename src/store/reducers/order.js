import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseSandwichSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseSandwichFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const purchaseSandwichStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const purchaseRedirectOnceUserClickedOrder = (state, action) => {
  return updateObject(state, {
    purchased: false
  });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.PURCHASE_SANDWICH_SUCCESS: return purchaseSandwichSuccess(state, action);

  case actionTypes.PURCHASE_SANDWICH_FAIL:  return purchaseSandwichFail(state, action);

  case actionTypes.PURCHASE_SANDWICH_START: return purchaseSandwichStart(state, action);

  case actionTypes.PURCHASE_REDIRECT_AFTER_CLICKING_ORDER: return purchaseRedirectOnceUserClickedOrder(state, action);

  case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);

  case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);

  case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);

  default:
    return state;
  }
};

export default reducer;

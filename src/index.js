import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import sandwichBuilderReducer from './store/reducers/sandwichBuilderReducer';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchSandwichBuilder, watchOrder } from './store/sagas/index';

const rootReducer = combineReducers({
  sandwichBuilderReducer: sandwichBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchSandwichBuilder);
sagaMiddleware.run(watchOrder);


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

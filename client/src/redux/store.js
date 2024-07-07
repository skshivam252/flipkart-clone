import { applyMiddleware, combineReducers, createStore } from 'redux';
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { getProductDetailsReducer, getProductReducer } from './reducers/product-reducer.js';
import { cartReducer } from './reducers/cart-reducer.js';
 
const reducer = combineReducers({
  getProducts: getProductReducer,
  getProductDetails: getProductDetailsReducer,
  cart: cartReducer
})

const middleware=[thunk];

const store= createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
import { configureStore } from '@reduxjs/toolkit';
import UIReducer from '../store/ui-store';
import CartReducer from '../store/cart-store';

const store = configureStore({
  reducer: {
    ui: UIReducer,
    cart: CartReducer,
  },
});

export default store;

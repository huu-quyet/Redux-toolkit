import { createSlice } from '@reduxjs/toolkit';
import { UIStoreActions } from './ui-store';

const CartSlice = createSlice({
  name: 'Cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replace(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.itemId === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existing) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existing.quantity = existing.quantity + 1;
        existing.totalPrice = existing.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existing = state.items.find((item) => item.itemId === id.id);
      state.totalQuantity--;
      state.changed = true;

      if (existing.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== id.id);
      } else {
        existing.quantity = existing.quantity - 1;
        existing.totalPrice = existing.totalPrice - existing.price;
      }
    },
  },
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://test-redux-1e119-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could fetch cart data!');
      }

      const data = response.json();

      return data;
    };

    try {
      const cart = await fetchData();
      dispatch(
        cartActions.replace({
          items: cart.items || [],
          totalQuantity: cart.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        UIStoreActions.notify({
          status: 'error',
          title: 'Error',
          message: 'Fetching data cart failed!',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      UIStoreActions.notify({
        status: 'sending',
        title: 'Loading...',
        message: 'Data cart sending',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://test-redux-1e119-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending data cart failed');
      }
    };

    try {
      await sendRequest();
      dispatch(
        UIStoreActions.notify({
          status: 'success',
          title: 'Success!',
          message: 'Sending data cart successfully!',
        })
      );
    } catch (error) {
      dispatch(
        UIStoreActions.notify({
          status: 'error',
          title: 'Error',
          message: error.message,
        })
      );
    }
  };
};

export const cartActions = CartSlice.actions;

export default CartSlice.reducer;

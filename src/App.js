import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/Layout/Notification';
import Products from './components/Shop/Products';
import { sendCartData, fetchCartData } from './components/store/cart-store';

let isValidate = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.isShowCart);
  const notify = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isValidate || !cart.changed) {
      isValidate = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notify && (
        <Notification
          status={notify.status}
          title={notify.title}
          message={notify.message}
        ></Notification>
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;

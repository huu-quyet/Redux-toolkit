import { useDispatch, useSelector } from 'react-redux';
import { UIStoreActions } from '../store/ui-store';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const totalItemOrder = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const showCartHandler = () => {
    dispatch(UIStoreActions.showCart());
  };
  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemOrder}</span>
    </button>
  );
};

export default CartButton;

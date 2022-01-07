import styles from "./Cart.module.css";
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartModalContext from "../../context/cart-modal-context";

const Cart = (props) => {
  const cartItems = [
    {
      id: "c1",
      name: "Sushi",
      amount: 2,
      price: 12.99,
    },
  ].map((item) => <li>{item.name}</li>);

  const ctx = useContext(CartModalContext)

  return (
    <Modal>
      <ul className={styles['card-items']}>{cartItems}</ul>
      <div className={styles.total}>
          <span>Total Amount</span>
          <span>35.92</span>
      </div>
      <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={ctx.onHideCart}>Close</button>
          <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

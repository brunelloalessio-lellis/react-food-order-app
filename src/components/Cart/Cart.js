import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartModalContext from "../../store/cart-modal-context";

const Cart = (props) => {
  const ctx = useContext(CartModalContext);
  let totalAmount = 0;
  const cartItems = ctx.items.map((item) => {
    totalAmount += item.amount * item.price;
    return <li>{item.name}</li>;
  });

  return (
    <Modal onBackdropClick={ctx.onHideCart}>
      <ul className={styles["card-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={ctx.onHideCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

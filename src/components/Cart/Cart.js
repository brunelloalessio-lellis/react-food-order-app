import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartModalContext from "../../store/cart-modal-context-cmp";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartModalContext);
  const [formVisible, setFormVisible] = useState(false);
  let totalAmount = 0;

  const cartItems = ctx.items.map((item) => {
    totalAmount += item.amount * item.price;

    const onRemoveItemHandler = () => {
      ctx.removeItem(item.id);
    };

    const onAddItemHandler = () => {
      ctx.addItem({
        ...item,
        amount: 1,
      });
    };

    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={onRemoveItemHandler}
        onAdd={onAddItemHandler}
      ></CartItem>
    );
  });

  const onOrderClick = () => {
    setFormVisible(true);
  };

  return (
    <Modal onBackdropClick={ctx.onHideCart}>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {formVisible && <Checkout />}
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={ctx.onHideCart}>
          Close
        </button>
        <button className={styles.button} onClick={onOrderClick}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;

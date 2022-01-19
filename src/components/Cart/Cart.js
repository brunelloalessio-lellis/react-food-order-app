import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartModalContext from "../../store/cart-modal-context-cmp";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartModalContext);
  const [formVisible, setFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSummit, setDidSummit] = useState(false);
  let totalAmount = 0;

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);

    fetch(
      "https://react-food-order-app-9345c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    )
      .then((response) => {
        setIsSubmitting(false);
        setDidSummit(true);
      })
      .catch(() => {});
  };

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

  const footerBarModalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={ctx.onHideCart}>
        Close
      </button>
      <button className={styles.button} onClick={onOrderClick}>
        Order
      </button>
    </div>
  );

  const cartModalContent = (
    <>
      <ul className={styles["cart-items"]}> {cartItems} </ul>{" "}
      <div className={styles.total}>
        <span> Total Amount </span> <span> $ {totalAmount.toFixed(2)} </span>{" "}
      </div>{" "}
      {formVisible && <Checkout submitOrderHandler={submitOrderHandler} />}{" "}
      {!formVisible && footerBarModalActions}{" "}
    </>
  );

  const isSubmittingContent = <p>Sending order data ...</p>;
  const didSubmitContent = (
    <>
      <p>Sucessfully sent order!</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={ctx.clearCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onBackdropClick={didSummit ? ctx.clearCart : ctx.onHideCart}>
      {!isSubmitting && !didSummit && cartModalContent}
      {isSubmitting && !didSummit && isSubmittingContent}
      {didSummit && didSubmitContent}
    </Modal>
  );
};

export default Cart;

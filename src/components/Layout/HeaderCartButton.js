import CartModalContext from "../../store/cart-modal-context-cmp";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartModalContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  const { items, totalAmount } = ctx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items, totalAmount]);

  return (
    <button className={btnClasses} onClick={ctx.onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{ctx.totalAmount}</span>
    </button>
  );
};

export default HeaderCartButton;

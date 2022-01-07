import CartModalContext from "../../store/cart-modal-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartModalContext);

  return (
    <button className={styles.button} onClick={ctx.onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{ctx.items.length}</span>
    </button>
  );
};

export default HeaderCartButton;

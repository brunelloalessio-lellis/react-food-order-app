import classes from "./Checkout.module.css";
import { useContext, useRef, useState } from "react";
import CartModalContext from "../../store/cart-modal-context-cmp";

const isEmpty = (val) => val.trim() === "";
const isCapValid = (val) => val.trim().length === 5;

const Checkout = (props) => {
  const ctx = useContext(CartModalContext);
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    setFormInputsValidity({
      name: !isEmpty(name),
      street: !isEmpty(street),
      city: !isEmpty(city),
      postal: isCapValid(postal),
    });

    if (
      isEmpty(name) ||
      isEmpty(street) ||
      isEmpty(city) ||
      !isCapValid(postal)
    ) {
      return;
    }

    //valid form
  };

  const nameCls = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetCls = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCls = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;
  const cityCls = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameCls}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetCls}>
        <label htmlFor="street">Your Street</label>
        <input type="text" id="street" ref={streetRef}></input>
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalCls}>
        <label htmlFor="postal">Your Postal Code</label>
        <input type="text" id="postal" ref={postalRef}></input>
        {!formInputsValidity.postal && <p>Please enter a valid postal.</p>}
      </div>
      <div className={cityCls}>
        <label htmlFor="city">Your City</label>
        <input type="text" id="city" ref={cityRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={ctx.onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

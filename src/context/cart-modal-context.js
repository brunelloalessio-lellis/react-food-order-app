import React from "react";
import { useState } from "react";

const CartModalContext = React.createContext({
  isCartOpened: false,
  onHideCart: () => {},
  onShowCart: () => {},
});

export const CartModalContextProvider = (props) => {
  const [isCartOpened, setIsCartOpened] = useState(false);

  const onHideCart = () => {
    setIsCartOpened(false);
  };

  const onShowCart = () => {
    setIsCartOpened(true);
  };

  return (
    <CartModalContext.Provider
      value={{
        isCartOpened: isCartOpened,
        onHideCart: onHideCart,
        onShowCart: onShowCart,
      }}
    >
      {props.children}
    </CartModalContext.Provider>
  );
};

export default CartModalContext
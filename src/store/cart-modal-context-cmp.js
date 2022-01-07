import React from "react";

const CartModalContext = React.createContext({
    isCartOpened: false,
    onHideCart: () => {},
    onShowCart: () => {},
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    mealList: [],
  });
  
  export default CartModalContext;
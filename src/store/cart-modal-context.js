import React, { useEffect } from "react";
import { useState } from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const CartModalContext = React.createContext({
  isCartOpened: false,
  onHideCart: () => {},
  onShowCart: () => {},
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  mealList: DUMMY_MEALS,
});

export const CartModalContextProvider = (props) => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mealList, setMealList] = useState(DUMMY_MEALS);

  const onHideCart = () => {
    setIsCartOpened(false);
  };

  const onShowCart = () => {
    setIsCartOpened(true);
  };

  const addItemToCartHandler = (item) => {
    setItems((prevState) => {
      const sameMeal = prevState.find(
        (itemSearch) => itemSearch.id === item.id
      );

      if (sameMeal) {
        sameMeal.amount += item.amount;
        return prevState;
      }

      return [...prevState, item];
    });
  };

  const removeItemFromCartHandler = (id) => {
    setItems((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    setTotalAmount(items.length);
  }, [items]);

  return (
    <CartModalContext.Provider
      value={{
        isCartOpened: isCartOpened,
        items: items,
        totalAmount: totalAmount,
        onHideCart: onHideCart,
        onShowCart: onShowCart,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        mealList: DUMMY_MEALS,
      }}
    >
      {props.children}
    </CartModalContext.Provider>
  );
};

export default CartModalContext;

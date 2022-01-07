import React, { useReducer } from "react";
import CartModalContext from "./cart-modal-context-cmp";

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

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isOpened: false,
  mealList: DUMMY_MEALS,
};

const calculateAmount = (arrItems) => {
  return arrItems.reduce((curNumber, item) => curNumber + item.amount, 0);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const itemAddFinder = state.items.find(
        (item) => item.name === action.item.name
      );

      if (itemAddFinder) {
        itemAddFinder.amount += action.item.amount;
        return {
          ...state,
          totalAmount: calculateAmount(state.items),
        };
      }

      action.item.id = new Date().getTime().toString();
      const newItemArray = [...state.items, action.item];

      return {
        ...state,
        items: newItemArray,
        totalAmount: calculateAmount(newItemArray),
      };

    case "REMOVE_ITEM":
      const itemToRemove = state.items.find((item) => item.id === action.id);

      if (itemToRemove.amount > 1) {
        itemToRemove.amount -= 1;
        return {
          ...state,
          totalAmount: calculateAmount(state.items),
        };
      }

      const removedItemArray = state.items.filter(
        (item) => item.id !== action.id
      );

      return {
        ...state,
        items: removedItemArray,
        totalAmount: calculateAmount(removedItemArray),
      };

    case "TOGGLE_CART_VISIBILITY":
      return {
        ...state,
        isOpened: action.open,
      };

    default:
      return state;
  }
};

export const CartModalContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const onHideCart = () => {
    dispatchCartAction({
      type: "TOGGLE_CART_VISIBILITY",
      open: false,
    });
  };

  const onShowCart = () => {
    dispatchCartAction({
      type: "TOGGLE_CART_VISIBILITY",
      open: true,
    });
  };

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  return (
    <CartModalContext.Provider
      value={{
        isCartOpened: cartState.isOpened,
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        mealList: cartState.mealList,
        onHideCart: onHideCart,
        onShowCart: onShowCart,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
      }}
    >
      {props.children}
    </CartModalContext.Provider>
  );
};

import React, { useEffect, useReducer } from "react";
import { useState } from "react";
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
  return arrItems.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
};

const cartReducer = (state, action) => {
  switch (action.type) {

    case "ADD_ITEM": {
      const newItemArray = [...state.items, action.item];

      return {
        ...state,
        items: newItemArray,
        totalAmount: calculateAmount(newItemArray),
      };
    }

    case "REMOVE_ITEM": {
      const newItemArray = state.items.filter((item) => item.id === action.id);

      return {
        ...state,
        items: newItemArray,
        totalAmount: calculateAmount(newItemArray),
      };
    }

    case "HIDE_CHART": {
      return {
        ...state,
        isOpened: false,
      };
    }
    
    case "SHOW_CHART": {
      return {
        ...state,
        isOpened: true,
      };
    }
  }

  return state;
};

export const CartModalContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const [mealList, setMealList] = useState(DUMMY_MEALS);

  const onHideCart = () => {
    dispatchCartAction({
      type: "HIDE_CART",
    });
  };

  const onShowCart = () => {
    dispatchCartAction({
      type: "SHOW_CART",
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

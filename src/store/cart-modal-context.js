import React, { useReducer, useEffect } from "react";
import CartModalContext from "./cart-modal-context-cmp";
import cartReducer from "./cart-reducer";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isOpened: false,
  mealList: [],
  isLoaded: false,
  error: "",
  isLoading: false,
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

  const loadMealList = () => {
    const firebaseUrl =
      "https://react-food-order-app-9345c-default-rtdb.firebaseio.com/meals.json";

    const errorParsingOrLoadingMeals = () => {
      dispatchCartAction({
        type: "ERROR_LOADING_MEALS",
      });
    };

    dispatchCartAction({
      type: "LOADING_MEALS",
    });

    fetch(firebaseUrl)
      .then((response) => {
        response
          .json()
          .then((jsonMeals) => {
            if (!jsonMeals) {
              dispatchCartAction({
                type: "LOAD_MEALS",
                meals: [],
              });
            } else {
              let listOfMeals = [];

              for (const key in jsonMeals) {
                if (jsonMeals.hasOwnProperty(key)) {
                  listOfMeals.push({
                    id: key,
                    ...jsonMeals[key],
                  });
                }
              }

              dispatchCartAction({
                type: "LOAD_MEALS",
                meals: listOfMeals,
              });
            }
          })
          .catch(errorParsingOrLoadingMeals);
      })
      .catch(errorParsingOrLoadingMeals);
  };

  const { isLoading, isLoaded, error } = cartState;

  useEffect(() => {
    if (!isLoaded && !isLoading && !error) {
      loadMealList();
    }
  }, [isLoading, isLoaded]);

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
        mealListLoaded: cartState.isLoaded,
        mealListError: cartState.error,
        mealListIsLoading: cartState.isLoading,
      }}
    >
      {props.children}
    </CartModalContext.Provider>
  );
};

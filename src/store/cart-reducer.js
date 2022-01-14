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

    case "LOADING_MEALS":
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: "",
      };
    case "ERROR_LOADING_MEALS":
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        error: "Error loading meals",
      };

    case "LOAD_MEALS":
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: "",
        mealList: action.meals,
      };

    default:
      return state;
  }
};

export default cartReducer;

import React, { useContext } from "react";

const CartContext = React.createContext(null);

const initialState = {
  items: [],
};

const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const items = [...state.items, action.payload];
      return {
        ...state,
        items,
      };
    }
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addItem = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
  };

  return <CartContext.Provider {...props} value={{ ...state, addItem }} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart should be used as a child of CartProvider");
  }
  return context;
};

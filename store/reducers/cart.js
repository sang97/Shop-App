import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      const { price, title, id } = addedProduct;

      let updatedItem;
      if (state.items[id]) {
        //item already exist in cart, increase quantity by one
        const { quantity, sum } = state.items[id];
        updatedItem = new CartItem(quantity + 1, price, title, sum + price);
      } else {
        //item does not exist in cart, add new one to cart
        updatedItem = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [id]: updatedItem },
        totalAmount: state.totalAmount + price
      };
    }
    case REMOVE_FROM_CART: {
      const id = action.id;
      const { quantity, price, title, sum } = state.items[id];
      let updatedCartItems;
      if (quantity === 1) {
        //erase the item in item list
        updatedCartItems = { ...state.items };
        delete updatedCartItems[id];
      } else {
        //decrease quantity by one
        const updatedCartItem = new CartItem(
          quantity - 1,
          price,
          title,
          sum - price
        );
        updatedCartItems = { ...state.items, [id]: updatedCartItem };
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - price
      };
    }
    case ADD_ORDER: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      const pid = action.id;
      if (!state.items[pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const { sum } = updatedItems[pid];
      delete updatedItems[pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - sum
      };
    }
  }
  return state;
};

export default cartReducer;

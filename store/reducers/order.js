import { ADD_ORDER } from "../actions/order";

import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const { items, amount } = action.orderData;
      const newOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date()
      );

      return {
          ...state,
          orders: state.orders.concat(newOrder)
      }
    }
  }
  return state;
};

import { ADD_ORDER, SET_ORDERS } from "../actions/order";

import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        orders: action.orders
      };
    }

    case ADD_ORDER: {
      const { items, amount, id, date } = action.orderData;
      const newOrder = new Order(id, items, amount, date);

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    }
  }
  return state;
};

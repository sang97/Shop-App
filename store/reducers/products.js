import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from "../actions/products";

import Product from "../../models/product";

const initalState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
};

const productReducer = (state = initalState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      const pid = action.id;
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== pid),
        availableProducts: state.availableProducts.filter(
          product => product.id !== pid
        )
      };
    }
    case CREATE_PRODUCT: {
      const { title, description, imageUrl, price } = action.data;
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        title,
        imageUrl,
        description,
        price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    }
    case UPDATE_PRODUCT: {
      const id = action.id;
      let pIndex = state.userProducts.findIndex(product => product.id === id);
      const { title, description, imageUrl, price } = action.data;

      const updatedProduct = new Product(
        id,
        state.userProducts[pIndex].ownerId,
        title,
        imageUrl,
        description,
        price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[pIndex] = updatedProduct;

      pIndex = state.availableProducts.findIndex(product => product.id === id);
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[pIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    }
  }
  return state;
};

export default productReducer;

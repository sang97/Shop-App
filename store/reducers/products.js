import PRODUCTS from "../../data/dummy-data";

const initalState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
};

const productReducer = (state = initalState, action) => {
  return state;
};

export default productReducer;

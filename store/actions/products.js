export const DELETE_PRODUCT = "DELETE PRODUCT";
export const CREATE_PRODUCT = "CREATE PRODUCT";
export const UPDATE_PRODUCT = "UPDATE PRODUCT";

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  };
};

export const createProduct = data => {
  return {
    type: CREATE_PRODUCT,
    data
  };
};

export const updateProduct = (id, data) => {
  return {
    type: UPDATE_PRODUCT,
    id,
    data
  };
};

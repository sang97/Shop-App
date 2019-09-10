import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE PRODUCT";
export const CREATE_PRODUCT = "CREATE PRODUCT";
export const UPDATE_PRODUCT = "UPDATE PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;

      const response = await fetch(
        "https://shop-app-d549b.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const { title, imageUrl, description, price, ownerId } = resData[key].data;
        loadedProducts.push(
          new Product(key, ownerId, title, imageUrl, description, Number(price))
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://shop-app-d549b.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      id
    });
  };
};

export const createProduct = data => {
  return async (dispatch, getState) => {
    // any async code will work
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://shop-app-d549b.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: {
            ...data,
            ownerId: userId
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      data: {
        ...data,
        id: responseData.name,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-app-d549b.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      id,
      data
    });
  };
};

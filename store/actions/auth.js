export const SIGN_UP = "SIGN_UP";

export const LOG_IN = "LOG_IN";

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDasZmkJnMbOnb8rpar4jsWzRKfT7OvSUE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = "Email already existed";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: SIGN_UP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDasZmkJnMbOnb8rpar4jsWzRKfT7OvSUE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email not found";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Invalid password";
      } else if (errorId === "USER_DISABLED") {
        message = "User disabled";
      }

      throw new Error(message);
    }
    const resData = await response.json();

    dispatch({ type: LOG_IN, token: resData.idToken, userId: resData.localId });
  };
};

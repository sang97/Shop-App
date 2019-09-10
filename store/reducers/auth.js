import { SIGN_UP, LOG_IN } from "../actions/auth";

const initalState = {
  token: null,
  userId: null
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      return {
        token: action.token,
        userId: action.userId
      };
    }
    case LOG_IN: {
      return {
        token: action.token,
        userId: action.userId
      };
    }
    default:
      return state;
  }
};

export default authReducer;

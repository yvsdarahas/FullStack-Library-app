import {
  GET_USERS,
  REGISTER_USER,
  SIGNED_IN_USER,
  BOOK_BORROWED,
  BOOK_GIVEAWAY,
  UserAction,
} from "../../types";

export const users = (
  state = {
    users: [],
    signedInUser: JSON.parse(localStorage.getItem("signedInUser") || `{}`),
    token: JSON.parse(localStorage.getItem("jwtToken") || `""`),
  },
  action: UserAction
) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case REGISTER_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case SIGNED_IN_USER:
      return {
        ...state,
        signedInUser: action.payload.user,
        token: action.payload.token,
      };

    case BOOK_BORROWED || BOOK_GIVEAWAY:
      return {
        ...state,
        signedInUser: action.payload,
      };

    default:
      return state;
  }
};

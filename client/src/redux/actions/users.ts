import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import axios from "axios";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import {
  GET_USERS,
  REGISTER_USER,
  SIGNED_IN_USER,
  BOOK_BORROWED,
  BOOK_GIVEAWAY,
  CustomUser,
  User,
  Book,
} from "../../types";

const fetchUsers = (users: User[]) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const registerUserAction = (user: User) => {
  return {
    type: REGISTER_USER,
    payload: user,
  };
};

export const signedInUser = (user: User, token: string) => {
  return {
    type: SIGNED_IN_USER,
    payload: { user, token },
  };
};

export const addToBorrowedList = (user: User) => {
  return {
    type: BOOK_BORROWED,
    payload: user,
  };
};

export const removeFromBorrowedList = (user: User) => {
  return {
    type: BOOK_GIVEAWAY,
    payload: user,
  };
};

export const getUsers = () => {
  return (dispatch: Dispatch) => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((response) => {
        dispatch(fetchUsers(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const registerUser = (user: CustomUser) => {
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/users", user)
      .then((response) => {
        dispatch(registerUserAction(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const userSignIn = (
  res: GoogleLoginResponse | GoogleLoginResponseOffline,
  history: RouteComponentProps["history"]
) => {
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/auth/google/signIn", {
        id_token: (res as GoogleLoginResponse).tokenObj.id_token,
      })
      .then((response) => {
        if (response.data.userVerify) {
          history.push("/");
          localStorage.setItem(
            "signedInUser",
            JSON.stringify(response.data.userVerify)
          );
          localStorage.setItem("jwtToken", JSON.stringify(response.data.token));
          dispatch(signedInUser(response.data.userVerify, response.data.token));
        } else {
          history.push("/register-user");
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const borrowBook = (user: User, book: Book, token: string) => {
  const headers = { "auth-token": token };
  return (dispatch: Dispatch) => {
    axios
      .patch(
        `http://localhost:5000/api/v1/users/${user._id}`,
        {
          books: [...user.books, book],
        },
        { headers }
      )
      .then((response) => {
        dispatch(addToBorrowedList(response.data));
        localStorage.setItem("signedInUser", JSON.stringify(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const returnBook = (user: User, book: Book, token: string) => {
  const headers = { "auth-token": token };

  const index = user.books.findIndex(
    (eachBook: Book) => eachBook.title === book.title
  );
  user.books.splice(index, 1);
  return (dispatch: Dispatch) => {
    axios
      .patch(
        `http://localhost:5000/api/v1/users/${user._id}`,
        {
          books: [...user.books],
        },
        { headers }
      )
      .then((response) => {
        dispatch(removeFromBorrowedList(response.data));
        localStorage.setItem("signedInUser", JSON.stringify(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

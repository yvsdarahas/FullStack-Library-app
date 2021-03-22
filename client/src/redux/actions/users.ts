import {
  GET_USERS,
  REGISTER_USER,
  SIGNED_IN_USER,
  BOOK_BORROWED,
  BOOK_GIVEAWAY,
} from "../../types";

import axios from "axios";
import { Dispatch } from "redux";

const fetchUsers = (users: any) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const postUser = (user: any) => {
  return {
    type: REGISTER_USER,
    payload: user,
  };
};

export const signedInUser = (user: any, token: string) => {
  return {
    type: SIGNED_IN_USER,
    payload: { user, token },
  };
};

export const addToBorrowedList = (user: any) => {
  return {
    type: BOOK_BORROWED,
    payload: user,
  };
};

export const removeFromBorrowedList = (user: any) => {
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

export const registerUser = (user: any) => {
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/users", user)
      .then((response) => {
        dispatch(postUser(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const borrowBook = (user: any, book: any, token: string) => {
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

export const returnBook = (user: any, book: any, token: string) => {
  const headers = { "auth-token": token };

  const index = user.books.findIndex(
    (eachBook: any) => eachBook.title === book.title
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

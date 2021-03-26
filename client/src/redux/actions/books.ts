import {
  GET_BOOKS,
  CREATE_BOOK,
  DELETE_BOOK,
  CustomBook,
  Book,
} from "../../types";

import axios from "axios";
import { Dispatch } from "redux";

const fetchBooks = (books: Book[]) => {
  return {
    type: GET_BOOKS,
    payload: books,
  };
};

const createBookAction = (book: Book) => {
  return {
    type: CREATE_BOOK,
    payload: book,
  };
};

const deleteBookAction = (books: Book[]) => {
  return {
    type: DELETE_BOOK,
    payload: books,
  };
};

export const getBooks = () => {
  return (dispatch: Dispatch) => {
    axios
      .get("http://localhost:5000/api/v1/books")
      .then((response) => {
        dispatch(fetchBooks(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const createBook = (book: CustomBook, token: string) => {
  const headers = { "auth-token": token };

  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/books", book, { headers })
      .then((response) => {
        dispatch(createBookAction(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deleteBook = (books: Book[], book: Book, token: string) => {
  const headers = { "auth-token": token };

  const reqBook = books.filter(
    (eachBook: Book) => eachBook.title === book.title
  );
  const bookId = reqBook[0]._id;

  return (dispatch: Dispatch) => {
    axios
      .delete(`http://localhost:5000/api/v1/books/${bookId}`, { headers })
      .then((response) => {
        dispatch(deleteBookAction(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const editBook = (book: Book, token: string) => {
  const headers = { "auth-token": token };
  const bookId = book._id;

  axios
    .patch(
      `http://localhost:5000/api/v1/books/${bookId}`,
      { ...book },
      {
        headers,
      }
    )
    .then((response) => {
      alert("Book edited successfully :)");
    })
    .catch((error) => {
      throw error;
    });
};

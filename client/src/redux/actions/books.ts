import { GET_BOOKS, CREATE_BOOK, DELETE_BOOK } from "../../types";

import axios from "axios";
import { Dispatch } from "redux";

const fetchBooks = (books: any) => {
  return {
    type: GET_BOOKS,
    payload: books,
  };
};

const postBook = (book: any) => {
  return {
    type: CREATE_BOOK,
    payload: book,
  };
};

const deleteBookAction = (books: any) => {
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
        const books = response.data;
        dispatch(fetchBooks(books));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const createBook = (book: any) => {
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/books", book)
      .then((response) => {
        console.log(response.data);
        dispatch(postBook(book));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deleteBook = (books: any, book: any) => {
  const reqBook = books.filter(
    (eachBook: any) => eachBook.title === book.title
  );
  const bookId = reqBook[0]._id;

  return (dispatch: Dispatch) => {
    axios
      .delete(`http://localhost:5000/api/v1/books/${bookId}`)
      .then((response) => {
        dispatch(deleteBookAction(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

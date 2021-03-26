import { GET_BOOKS, CREATE_BOOK, DELETE_BOOK, BooksAction } from "../../types";

const initialState = {
  books: [],
};

export const books = (state = initialState, action: BooksAction) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };

    case CREATE_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: [...action.payload],
      };

    default:
      return state;
  }
};

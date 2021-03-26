export const GET_BOOKS = "GET_BOOKS";
export const CREATE_BOOK = "CREATE_BOOK";
export const REGISTER_USER = "REGISTER_USER";
export const GET_USERS = "GET_USERS";
export const SIGNED_IN_USER = "SIGNED_IN_USER";
export const BOOK_BORROWED = "BOOK_BORROWED";
export const BOOK_GIVEAWAY = "BOOK_GIVEAWAY";
export const DELETE_BOOK = "DELETE_BOOK";

export type Book = {
  author: string;
  availability: boolean;
  coverPage: string;
  genre: string;
  _id: string;
  pages: number;
  published: number;
  rating: number;
  shortDescription: string;
  title: string;
};

export type User = {
  books: Book[];
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
  isAdmin: boolean;
  password: string;
  picture: string;
};

export type CustomBook = {
  title: string;
  author: string;
  coverPage: string;
  shortDescription: string;
  published: number;
  pages: number;
  genre: string;
  rating: number;
};

export type CustomUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Books = {
  books: Book[];
};

export type Users = {
  signedInUser: User;
  token: string;
  users: User[];
};

export type ReduxState = {
  books: Books;
  users: Users;
};

export type FetchBooksAction = {
  type: typeof GET_BOOKS;
  payload: Book[];
};

export type CreateBookAction = {
  type: typeof CREATE_BOOK;
  payload: Book;
};

export type DeleteBookAction = {
  type: typeof DELETE_BOOK;
  payload: Book[];
};

export type BooksAction =
  | FetchBooksAction
  | CreateBookAction
  | DeleteBookAction;

export type FetchUsersAction = {
  type: typeof GET_USERS;
  payload: User[];
};

export type RegisterUserAction = {
  type: typeof REGISTER_USER;
  payload: User;
};

export type SignedInUserAction = {
  type: typeof SIGNED_IN_USER;
  payload: {
    user: User;
    token: string;
  };
};

export type AddBookBorrowedAction = {
  type: typeof BOOK_BORROWED;
  payload: User;
};

export type RemoveBookBorrowedAction = {
  type: typeof BOOK_GIVEAWAY;
  payload: User;
};

export type UserAction =
  | RegisterUserAction
  | FetchUsersAction
  | SignedInUserAction
  | AddBookBorrowedAction
  | RemoveBookBorrowedAction;

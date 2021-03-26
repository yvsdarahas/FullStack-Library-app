import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { returnBook } from "../../redux/actions/users";
import { Book, ReduxState } from "../../types";

import "./index.css";

export const BooksBorrowed = () => {
  const dispatch = useDispatch();
  const booksBorrowed = useSelector(
    (state: ReduxState) => state.users.signedInUser.books
  );
  const user = useSelector((state: ReduxState) => state.users.signedInUser);
  const token = useSelector((state: ReduxState) => state.users.token);

  const handleReturnBook = (book: Book) => {
    dispatch(returnBook(user, book, token));
  };

  return (
    <div className="borrowed-books">
      {booksBorrowed.map((book: Book) => (
        <div className="borrowedbook" key={book.title}>
          <Link style={{ textDecoration: "none" }} to={`/${book.title}`}>
            <img
              src={book.coverPage}
              alt="CoverPage"
              width="200px"
              height="300px"
            />
          </Link>
          <button onClick={() => handleReturnBook(book)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { returnBook } from "../../redux/actions/users";

import "./index.css";

const BooksBorrowed = () => {
  const dispatch = useDispatch();
  const booksBorrowed = useSelector(
    (state: any) => state.users.signedInUser.books
  );
  const user = useSelector((state: any) => state.users.signedInUser);
  const token = useSelector((state: any) => state.users.token);

  const handleReturnBook = (book: any) => {
    dispatch(returnBook(user, book, token));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {booksBorrowed.map((book: any) => (
        <div key={book._id}>
          <img src={book.coverPage} alt="CoverPage" />
          <ul>
            <li>{book.title}</li>
            <li>{book.author}</li>
          </ul>
          <button onClick={() => handleReturnBook(book)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default BooksBorrowed;

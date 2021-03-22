import { useDispatch, useSelector } from "react-redux";
import { returnBook } from "../../redux/actions/users";

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
        <ul key={book._id}>
          <li>
            <img src={book.coverPage} alt="CoverPage" />
          </li>
          <li>{book.title}</li>
          <li>{book.author}</li>
          <button onClick={() => handleReturnBook(book)}>Remove</button>
        </ul>
      ))}
    </div>
  );
};

export default BooksBorrowed;

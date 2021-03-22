import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { borrowBook, returnBook } from "../../redux/actions/users";

export const DetailedInfoOfBook = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const books = useSelector((state: any) => state.books.books);
  const user = useSelector((state: any) => state.users.signedInUser);
  const token = useSelector((state: any) => state.users.token);

  const { bookInfo } = useParams<{ bookInfo: string }>();
  const verifyBook = token
    ? user.books.filter((book: any) => book.title === bookInfo)
    : null;
  const [buttonStatus, setButtonStatus] = useState(
    token ? (verifyBook.length >= 1 ? false : true) : true
  );

  const handleBorrowBook = (book: any) => {
    if (token) {
      dispatch(borrowBook(user, book, token));
      setButtonStatus(!buttonStatus);
    } else {
      history.push("/signIn");
    }
  };

  const handleReturnBook = (book: any) => {
    dispatch(returnBook(user, book, token));
    setButtonStatus(!buttonStatus);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {books
        .filter((book: any) => book.title === bookInfo)
        .map((book: any) => (
          <div key={book._id}>
            <div
              key={book._id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src={book.coverPage}
                alt="coverPage"
                width="300px"
                height="450px"
                style={{ margin: "20px" }}
              />
              <div>
                <ul style={{ width: "50%" }}>
                  <li>
                    <h1>{book.title}</h1>
                  </li>
                  <li>
                    <h3>{book.author}</h3>
                  </li>
                  <li style={{ width: "80%", marginBottom: "100px" }}>
                    {book.shortDescription}
                  </li>
                  <li>Published : {book.published}</li>
                  <li>Genre : {book.genre}</li>
                  <li>Pages : {book.pages}</li>
                  <li>{book.rating} / 5</li>
                </ul>
                <button
                  disabled={!buttonStatus}
                  onClick={() => handleBorrowBook(book)}
                >
                  Borrow
                </button>
                <button
                  disabled={buttonStatus}
                  onClick={() => handleReturnBook(book)}
                >
                  Give back
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Book, ReduxState } from "../../types";

export const GenrePage = () => {
  const genreParam = useParams<{ genre: string }>();
  const books = useSelector((state: ReduxState) => state.books.books);

  return (
    <div style={{ marginTop: "100px" }}>
      {books
        .filter((book: Book) => book.genre === genreParam.genre.toLowerCase())
        .map((book: Book) => (
          <div
            key={book.title}
            className="inShortAboutBook"
            style={{ display: "flex", margin: "20px" }}
          >
            <Link to={`/${book.title}`}>
              <img
                src={book.coverPage}
                alt="coverPage"
                width="150px"
                height="200px"
              />
            </Link>
            <ul>
              <li
                style={{
                  fontSize: "25px",
                  fontWeight: 700,
                  marginBottom: "15px",
                }}
              >
                {book.title}
              </li>
              <li
                style={{
                  fontSize: "19px",
                  fontWeight: 550,
                  marginBottom: "30px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  By{" "}
                </span>
                {book.author}
              </li>
              <li
                style={{
                  fontSize: "22px",
                  marginBottom: "10px",
                }}
              >
                {book.rating} / 5
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

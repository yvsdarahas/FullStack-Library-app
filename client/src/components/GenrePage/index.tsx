import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const GenrePage = () => {
  const genreParam = useParams<{ genre: string }>();
  const books = useSelector((state: any) => state.books.books);

  return (
    <div style={{ marginTop: "100px" }}>
      {books
        .filter((book: any) => book.genre === genreParam.genre.toLowerCase())
        .map((book: any) => (
          <div
            key={book._id}
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

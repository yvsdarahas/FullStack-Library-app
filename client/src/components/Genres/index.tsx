import React from "react";
import { Link } from "react-router-dom";
import { CardView } from "../CardView";
import "./index.css";

export const Genre = ({ books, title }: any) => {
  return (
    <div>
      <div className="genre-head">
        <h1>{title}</h1>
        <h4>
          <Link to={`/genre/${title}`}>Explore all</Link>
        </h4>
      </div>
      <ul className="genre">
        {books.slice(0, 6).map((book: any) => (
          <li key={book._id}>
            <Link style={{ textDecoration: "none" }} to={`/${book.title}`}>
              <CardView book={book} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

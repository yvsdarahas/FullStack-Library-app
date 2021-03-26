import { Link } from "react-router-dom";
import { CardView } from "../CardView";
import { Book } from "../../types";
import "./index.css";

type GenreProps = {
  books: Book[];
  title: string;
};

export const Genre = ({ books, title }: GenreProps) => {
  return (
    <div>
      <div className="genre-head">
        <h1>{title}</h1>
        <h4>
          <Link to={`/genre/${title}`}>Explore all</Link>
        </h4>
      </div>
      <ul className="genre">
        {books.slice(0, 6).map((book: Book) => (
          <li key={book.title}>
            <Link style={{ textDecoration: "none" }} to={`/${book.title}`}>
              <CardView book={book} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

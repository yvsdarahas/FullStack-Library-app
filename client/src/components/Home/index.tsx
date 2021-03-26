import { Genre } from "../Genres";
import useFilter from "../../hooks/useFilter";
import { Book } from "../../types";
import "./index.css";

type HomeProps = {
  search: string;
  books: Book[];
};

export const Home = ({ search, books }: HomeProps) => {
  const filteredBooks = useFilter(books, search);

  const children = filteredBooks.filter(
    (book: Book) => book.genre === "children"
  );
  const romance = filteredBooks.filter(
    (book: Book) => book.genre === "romance"
  );
  const thriller = filteredBooks.filter(
    (book: Book) => book.genre === "thriller"
  );

  return (
    <div style={{ marginTop: "100px" }}>
      <section className="main">
        <Genre books={children} title="Children" />
        <Genre books={romance} title="Romance" />
        <Genre books={thriller} title="Thriller" />
      </section>
    </div>
  );
};

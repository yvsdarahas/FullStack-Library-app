import React from "react";
import { Genre } from "../Genres";
import useFilter from "../../hooks/useFilter";
import "./index.css";

export const Home = ({ search, books }: any) => {
  const filteredBooks = useFilter(books, search);

  const children = filteredBooks.filter(
    (book: any) => book.genre === "children"
  );
  const romance = filteredBooks.filter((book: any) => book.genre === "romance");
  const thriller = filteredBooks.filter(
    (book: any) => book.genre === "thriller"
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

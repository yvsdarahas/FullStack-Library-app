import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../redux/actions/books";

export const DeleteBook = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.books.books);
  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(deleteBook(books, book));
  };

  return (
    <div className="create-book" style={{ marginTop: "100px" }}>
      <div className="createbook-head">
        <h1>LIBRARY</h1>
        <h3>DELETE A BOOK</h3>
      </div>
      <form method="post" onSubmit={handleSubmit} className="createbook-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            required
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            value={book.title}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            required
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            value={book.author}
          />
        </div>
        <button className="createbook-button" type="submit">
          Delete Book
        </button>
      </form>
    </div>
  );
};

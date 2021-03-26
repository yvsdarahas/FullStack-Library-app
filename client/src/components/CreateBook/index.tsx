import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/actions/books";
import { ReduxState } from "../../types";
import "./index.css";

export const CreateBook = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: ReduxState) => state.users.token);
  const [book, setBook] = useState({
    title: "",
    author: "",
    coverPage: "",
    shortDescription: "",
    published: 0,
    pages: 0,
    genre: "",
    rating: 0,
  });

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    dispatch(createBook(book, token));
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="createbook-form">
      <div className="form-inputs">
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
        <div>
          <label htmlFor="coverPage">Cover page</label>
          <input
            type="text"
            name="coverPage"
            required
            placeholder="URL for cover image"
            onChange={(e) => setBook({ ...book, coverPage: e.target.value })}
            value={book.coverPage}
          />
        </div>
        <div>
          <label htmlFor="shortDescription">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            required
            onChange={(e) =>
              setBook({ ...book, shortDescription: e.target.value })
            }
            value={book.shortDescription}
          />
        </div>
        <div>
          <label htmlFor="published">Published Date</label>
          <input
            type="number"
            min="1950"
            name="published"
            required
            onChange={(e) =>
              setBook({
                ...book,
                published: parseInt(e.target.value) || 0,
              })
            }
            value={book.published}
          />
        </div>
        <div>
          <label htmlFor="pages">Pages</label>
          <input
            type="number"
            name="pages"
            min="0"
            required
            onChange={(e) =>
              setBook({ ...book, pages: parseInt(e.target.value) || 0 })
            }
            value={book.pages}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            name="genre"
            required
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            value={book.genre}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="float"
            name="rating"
            min="0"
            max="5"
            required
            onChange={(e) =>
              setBook({ ...book, rating: parseFloat(e.target.value) || 0 })
            }
            value={book.rating}
          />
        </div>
      </div>
      <button className="createbook-button" type="submit">
        Add Book
      </button>
    </form>
  );
};

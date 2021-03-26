import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook } from "../../redux/actions/books";
import { ReduxState, Book } from "../../types";
import "./index.css";

type EditBookProps = {
  book: Book;
  setClickedEdit: (clickToEdit: boolean) => void;
};

export const EditBook = ({ book, setClickedEdit }: EditBookProps) => {
  const dispatch = useDispatch();
  const token = useSelector((state: ReduxState) => state.users.token);
  const [bookToEdit, setBookToEdit] = useState({ ...book });

  const handleEditBook = () => {
    dispatch(editBook(bookToEdit, token));
  };

  return (
    <div className="editpage-border">
      <form className="editbook-form">
        <div className="editform-inputs">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              required
              value={bookToEdit.title}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              required
              onChange={(e) =>
                setBookToEdit({ ...bookToEdit, author: e.target.value })
              }
              value={bookToEdit.author}
            />
          </div>
          <div>
            <label htmlFor="coverPage">Cover page</label>
            <input
              type="text"
              name="coverPage"
              required
              placeholder="URL for cover image"
              onChange={(e) =>
                setBookToEdit({ ...bookToEdit, coverPage: e.target.value })
              }
              value={bookToEdit.coverPage}
            />
          </div>
          <div>
            <label htmlFor="shortDescription">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              required
              value={bookToEdit.shortDescription}
              onChange={(e) =>
                setBookToEdit({
                  ...bookToEdit,
                  shortDescription: e.target.value,
                })
              }
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
                setBookToEdit({
                  ...bookToEdit,
                  published: parseInt(e.target.value) || 0,
                })
              }
              value={bookToEdit.published}
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
                setBookToEdit({
                  ...bookToEdit,
                  pages: parseInt(e.target.value) || 0,
                })
              }
              value={bookToEdit.pages}
            />
          </div>
          <div>
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              required
              onChange={(e) =>
                setBookToEdit({ ...bookToEdit, genre: e.target.value })
              }
              value={bookToEdit.genre}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="float"
              name="rating"
              required
              value={bookToEdit.rating}
              readOnly
            />
          </div>
        </div>
        <button onClick={() => handleEditBook()}>Edit Book</button>
        <button onClick={() => setClickedEdit(false)}>Cancel</button>
      </form>
    </div>
  );
};

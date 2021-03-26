import { Book } from "../../types";
import "./index.css";

type CardViewProp = {
  book: Book;
};

export const CardView = ({ book }: CardViewProp) => {
  return (
    <>
      <ul className="cardview">
        <li>
          <img
            src={book.coverPage}
            alt="cover page"
            height="250px"
            width="180px"
          />
        </li>
        <li style={{ textDecoration: "none", color: "black" }}>{book.title}</li>
      </ul>
    </>
  );
};

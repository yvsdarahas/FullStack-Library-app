import React from "react";
import "./index.css";

export const CardView = ({ book }: any) => {
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

import React from "react";
import { Link } from "react-router-dom";

const AdminPreviliges = () => {
  return (
    <>
      <li>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to="/create-book"
        >
          Create / Edit Book
        </Link>
      </li>
      <li>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to="/delete-book"
        >
          Delete Book
        </Link>
      </li>
      <li>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to="/"
        >
          Users Info
        </Link>
      </li>
    </>
  );
};

export default AdminPreviliges;

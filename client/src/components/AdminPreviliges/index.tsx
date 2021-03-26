import { Link } from "react-router-dom";

export const AdminPreviliges = () => {
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
          Create Book
        </Link>
      </li>
      <li>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to="/allUsers"
        >
          Users Info
        </Link>
      </li>
    </>
  );
};

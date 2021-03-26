import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/users";
import { Book, ReduxState, User } from "../../types";

export const AllUsersInfo = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: ReduxState) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div style={{ marginTop: "100px", width: "100%" }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Name</th>
            <th>No.of books borrowed</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user: User) => user.isAdmin === false)
            .map((user: User) => (
              <tr key={user.email}>
                <td>
                  <img
                    src={`${user.picture}`}
                    alt="profilePicture"
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{user.email}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.books.length}</td>
                <td>
                  <ul>
                    {user.books.map((book: Book) => (
                      <li key={book.title}>{book.title}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

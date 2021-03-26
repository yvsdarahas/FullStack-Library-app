import { useSelector } from "react-redux";
import { Book, ReduxState } from "../../types";

import "./index.css";

type SetProfileClicked = {
  setProfileClicked: (profileClicked: boolean) => void;
};

export const Profile = ({ setProfileClicked }: SetProfileClicked) => {
  const signedInUser = useSelector(
    (state: ReduxState) => state.users.signedInUser
  );

  return (
    <>
      <div className="profileDetailsOuter">
        <ul className="profileDetails">
          <li>
            <img
              src={`${signedInUser.picture}`}
              alt="profilePicture"
              style={{
                height: "120px",
                width: "120px",
                borderRadius: "50%",
              }}
            />
          </li>
          <li>{signedInUser.email}</li>
          <li>
            {signedInUser.firstName} {signedInUser.lastName}
          </li>
          <li>Role: {signedInUser.isAdmin ? "Admin" : "User"}</li>
          <li>{signedInUser.books.length} books borrowed</li>
          <ol>
            {signedInUser.books.map((book: Book) => (
              <li key={book.title}>{book.title}</li>
            ))}
          </ol>
          <button onClick={() => setProfileClicked(false)}>Close</button>
        </ul>
      </div>
    </>
  );
};

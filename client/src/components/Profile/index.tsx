import { useSelector } from "react-redux";

import "./index.css";

type SetProfileClicked = {
  setProfileClicked: any;
};
export const Profile = ({ setProfileClicked }: SetProfileClicked) => {
  const signedInUser = useSelector((state: any) => state.users.signedInUser);

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
            {signedInUser.books.map((book: any) => (
              <li key={book._id}>{book.title}</li>
            ))}
          </ol>
          <button onClick={() => setProfileClicked(false)}>Close</button>
        </ul>
      </div>
    </>
  );
};

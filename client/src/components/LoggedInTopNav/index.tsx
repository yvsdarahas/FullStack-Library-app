import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminPreviliges } from "../AdminPreviliges";
import { ReduxState } from "../../types";

type LoggedInTopNavProps = {
  borrowedBooksCount: number;
  setProfileClicked: (profileClicked: boolean) => void;
  isProfileClicked: boolean;
};

export const LoggedInTopNav = ({
  borrowedBooksCount,
  setProfileClicked,
  isProfileClicked,
}: LoggedInTopNavProps) => {
  const history = useHistory();
  const [isProfileImgClicked, setProfileImgClicked] = useState(false);
  const signedInUser = useSelector(
    (state: ReduxState) => state.users.signedInUser
  );

  const handleLogOut = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  const handleProfileDropDown = () => {
    setProfileImgClicked(!isProfileImgClicked);
  };

  const handleProfileDetails = () => {
    setProfileClicked(!isProfileClicked);
  };

  return (
    <ul>
      <li className="borrow">
        <Link to={`/${signedInUser.firstName}/booksBorrowed`}>
          <i className="fas fa-grin-hearts"></i>
        </Link>
        <div className="borrowedCount">{borrowedBooksCount}</div>
      </li>
      <li>
        <img
          src={`${signedInUser.picture}`}
          alt="profilePicture"
          className="profilePic"
          onClick={() => handleProfileDropDown()}
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            marginRight: "25px",
          }}
        />
      </li>
      {isProfileImgClicked ? (
        <ul className="profileDropDown">
          <li
            onClick={() => {
              handleProfileDetails();
            }}
          >
            Profile
          </li>
          {signedInUser.isAdmin ? <AdminPreviliges /> : null}

          <li onClick={() => handleLogOut()} style={{ cursor: "pointer" }}>
            Log Out
          </li>
        </ul>
      ) : null}
    </ul>
  );
};

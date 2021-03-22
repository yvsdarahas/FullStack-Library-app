import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminPreviliges from "../AdminPreviliges";
import "./index.css";

export const TopNav = ({ search, setSearch, borrowedBooksCount }: any) => {
  const [viewProfile, setViewProfile] = useState(false);
  const signedInUser = useSelector((state: any) => state.users.signedInUser);

  const token = useSelector((state: any) => state.users.token);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleProfile = () => {
    setViewProfile(!viewProfile);
  };

  return (
    <div>
      <nav className="topnav-bar">
        <h2>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              marginLeft: "25px",
            }}
            to="/"
          >
            Library
          </Link>
        </h2>
        <input
          className="search-bar"
          name="search-bar"
          value={search}
          onChange={setSearch}
          placeholder="Search for title, author"
        />
        {token ? (
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
                onClick={() => handleProfile()}
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  marginRight: "25px",
                }}
              />
            </li>
            {viewProfile ? (
              <ul className="profileDropDown">
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/"
                  >
                    Profile
                  </Link>
                </li>
                {signedInUser.isAdmin ? <AdminPreviliges /> : null}

                <li
                  onClick={() => handleLogOut()}
                  style={{ cursor: "pointer" }}
                >
                  Log Out
                </li>
              </ul>
            ) : null}
          </ul>
        ) : (
          <ul>
            <li>
              <button>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/register-user"
                >
                  Sign Up
                </Link>
              </button>
            </li>
            <li>
              <button>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/signIn"
                >
                  Sign In
                </Link>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

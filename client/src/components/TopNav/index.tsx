import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Profile } from "../Profile";
import { LoggedInTopNav } from "../LoggedInTopNav";
import { ReduxState } from "../../types";

import "./index.css";

type TopNavProps = {
  search: string;
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borrowedBooksCount: number;
};

export const TopNav = ({
  search,
  setSearch,
  borrowedBooksCount,
}: TopNavProps) => {
  const [isProfileClicked, setProfileClicked] = useState(false);

  const token = useSelector((state: ReduxState) => state.users.token);

  return (
    <div>
      <div>
        {isProfileClicked ? (
          <div>
            <Profile setProfileClicked={setProfileClicked} />
          </div>
        ) : null}
      </div>
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
          <LoggedInTopNav
            borrowedBooksCount={borrowedBooksCount}
            setProfileClicked={setProfileClicked}
            isProfileClicked={isProfileClicked}
          />
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

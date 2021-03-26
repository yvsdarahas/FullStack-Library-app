import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/users";
import { GoogleRegister } from "../GoogleRegister";
import { User, CustomUser, ReduxState } from "../../types";
import "./index.css";

export const UserRegister = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: ReduxState) => state.users.users);

  const [isExist, setIsExist] = useState(false);
  const [status, setStatus] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateUserAndRegister = (user: CustomUser) => {
    const userCheck = users.filter(
      (eachUser: User) => eachUser.email === user.email
    );

    if (userCheck.length >= 1) {
      setIsExist(true);
    } else {
      dispatch(registerUser(user));
    }
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    validateUserAndRegister(user);
  };

  return (
    <div className="register-user">
      <div className="registeruser-head">
        <h1>User</h1>
        <h3>USER REGISTRY</h3>
      </div>
      <form method="post" onSubmit={handleSubmit} className="registeruser-form">
        <span>{status}</span>
        <div>
          {isExist ? <span>User already exists</span> : null}
          <label htmlFor="firstName">firstName</label>
          <input
            type="text"
            name="firstName"
            required
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            value={user.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">lastName</label>
          <input
            type="text"
            name="lastName"
            required
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            value={user.lastName}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
        </div>
        <button className="registeruser-button" type="submit">
          Register
        </button>
        <GoogleRegister setStatus={setStatus} />
      </form>
    </div>
  );
};

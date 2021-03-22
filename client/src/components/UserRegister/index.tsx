import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerUser } from "../../redux/actions/users";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import "./index.css";

export const UserRegister = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);

  const [isExist, setIsExist] = useState(false);
  const [status, setStatus] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateUserAndRegister = (user: any) => {
    const userCheck = users.filter(
      (eachUser: any) => eachUser.email === user.email
    );

    if (userCheck.length >= 1) {
      setIsExist(true);
    } else {
      dispatch(registerUser(user));
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validateUserAndRegister(user);
  };

  const onSuccess = async (res: any) => {
    axios
      .post("http://localhost:5000/auth/google/register", {
        id_token: res.tokenObj.id_token,
      })
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFailure = (error: Error) => {
    console.log(error);
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
        <GoogleLogin
          clientId="930886919119-vlq8fcf512qojlv3ngrjgopn2jspkj4j.apps.googleusercontent.com"
          render={(renderProps) => (
            <GoogleButton
              label="Sign Up with Google"
              onClick={renderProps.onClick}
            />
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        />
      </form>
    </div>
  );
};

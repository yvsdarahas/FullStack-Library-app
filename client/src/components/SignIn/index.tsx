import React, { useState } from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { signedInUser } from "../../redux/actions/users";

export const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const users = useSelector((state: any) => state.users.users);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onSuccess = async (res: any) => {
    console.log(res);
    axios
      .post("http://localhost:5000/auth/google/signIn", {
        id_token: res.tokenObj.id_token,
      })
      .then((response) => {
        if (response.data.userVerify) {
          history.push("/");
          localStorage.setItem(
            "signedInUser",
            JSON.stringify(response.data.userVerify)
          );
          localStorage.setItem("jwtToken", JSON.stringify(response.data.token));
          dispatch(signedInUser(response.data.userVerify, response.data.token));
        } else {
          history.push("/register-user");
        }
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
        <h3>USER SignIn</h3>
      </div>
      <form className="registeruser-form">
        <div>
          <label htmlFor="email">Email</label>
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
          Sign In
        </button>
        <GoogleLogin
          clientId="930886919119-vlq8fcf512qojlv3ngrjgopn2jspkj4j.apps.googleusercontent.com"
          render={(renderProps) => (
            <GoogleButton onClick={renderProps.onClick}>
              Sign in with Google
            </GoogleButton>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        />
      </form>
    </div>
  );
};

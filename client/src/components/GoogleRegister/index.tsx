import GoogleButton from "react-google-button";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "axios";

type GoogleRegisterProps = {
  setStatus: (status: string) => void;
};

export const GoogleRegister = ({ setStatus }: GoogleRegisterProps) => {
  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    axios
      .post("http://localhost:5000/auth/google/register", {
        id_token: (res as GoogleLoginResponse).tokenObj.id_token,
      })
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFailure = (error: Error) => {
    throw error;
  };

  return (
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
  );
};

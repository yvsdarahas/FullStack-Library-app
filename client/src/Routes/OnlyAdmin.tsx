import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../types";

type PrivateRouteProps = {
  component: React.ComponentType<RouteProps>;
  exact: boolean;
  path: string;
};

export const OnlyAdmin = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const signInToken = useSelector((state: ReduxState) => state.users.token);
  const signedInUser = useSelector(
    (state: ReduxState) => state.users.signedInUser
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        signInToken && signedInUser.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signIn" />
        )
      }
    />
  );
};

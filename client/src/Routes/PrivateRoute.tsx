import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../types";

type PrivateRouteProps = {
  component: React.ComponentType<RouteProps>;
  exact: boolean;
  path: string;
};

export const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const signInToken = useSelector((state: ReduxState) => state.users.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        signInToken ? <Component {...props} /> : <Redirect to="/signIn" />
      }
    />
  );
};

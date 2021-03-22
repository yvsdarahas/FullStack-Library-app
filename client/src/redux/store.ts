import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

// const initialState = {
//   users: {
//     users: useSelector((state: any) => state.users.users),
//     signedInUser: JSON.parse(localStorage.getItem("signedInUser") || `{}`),
//   },
// };

export const store = createStore(reducer, compose(applyMiddleware(thunk)));

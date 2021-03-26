import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateBook } from "./components/CreateBook";
import { TopNav } from "./components/TopNav";
import { UserRegister } from "./components/UserRegister";
import { Home } from "./components/Home";
import { SignIn } from "./components/SignIn";
import { GenrePage } from "./components/GenrePage";
import { DetailedInfoOfBook } from "./components/DetailedInfoOfBook";
import { BooksBorrowed } from "./components/BooksBorrowed";
import { AllUsersInfo } from "./components/AllUsersInfo";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { OnlyAdmin } from "./Routes/OnlyAdmin";
import { getBooks } from "./redux/actions/books";
import { ReduxState } from "./types";

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  const books = useSelector((state: ReduxState) => state.books.books);
  const signInToken = useSelector((state: ReduxState) => state.users.token);
  const signedInUser = useSelector(
    (state: ReduxState) => state.users.signedInUser
  );

  const borrowedBooks = useSelector((state: ReduxState) =>
    signInToken ? state.users.signedInUser.books.length : 0
  );

  if (!signInToken) {
    localStorage.clear();
  }

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch, books.length]);

  return (
    <div className="App">
      <Router>
        <TopNav
          search={search}
          setSearch={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          borrowedBooksCount={signInToken ? borrowedBooks : 0}
        />
        <Switch>
          <Route exact path="/register-user" component={UserRegister} />
          <Route exact path="/signIn" component={SignIn} />
          <OnlyAdmin exact path="/allUsers" component={AllUsersInfo} />
          <OnlyAdmin exact path="/create-book" component={CreateBook} />
          <Route exact path="/genre/:genre" component={GenrePage} />
          <PrivateRoute
            exact
            path={`/${signedInUser.firstName}/booksBorrowed`}
            component={BooksBorrowed}
          />
          <Route
            exact
            path="/"
            component={() => <Home search={search} books={books} />}
          />
          <Route exact path="/:bookInfo" component={DetailedInfoOfBook} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

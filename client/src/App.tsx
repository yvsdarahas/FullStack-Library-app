import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateBook } from "./components/CreateBook";
import { DeleteBook } from "./components/DeleteBook";
import { TopNav } from "./components/TopNav";
import { UserRegister } from "./components/UserRegister";
import { getUsers } from "./redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "./components/Home";
import { getBooks } from "./redux/actions/books";
import { SignIn } from "./components/SignIn";
import { GenrePage } from "./components/GenrePage";
import { DetailedInfoOfBook } from "./components/DetailedInfoOfBook";
import BooksBorrowed from "./components/BooksBorrowed";

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  const users = useSelector((state: any) => state.users);
  const books = useSelector((state: any) => state.books.books);
  const signInToken = useSelector((state: any) => state.users.token);
  const signedInUser = useSelector((state: any) => state.users.signedInUser);

  const borrowedBooks = useSelector((state: any) =>
    signInToken ? state.users.signedInUser.books.length : 0
  );

  if (!signInToken) {
    localStorage.clear();
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, users.users.length]);

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
          <Route exact path="/create-book" component={CreateBook} />
          <Route exact path="/delete-book" component={DeleteBook} />
          <Route exact path="/genre/:genre" component={GenrePage} />
          <Route
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

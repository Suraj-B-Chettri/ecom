import "./default.scss";
import HomePage from "./pages/HomePage";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import WithAuth from "./hoc/withAuth";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Registration from "./pages/Registration";
import Login from "./pages/LoginPage";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import { checkUserSession } from "./redux/User/user.actions";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <HomePage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/signup"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />

        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />

        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              {" "}
              <Recovery />{" "}
            </MainLayout>
          )}
        />

        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                {" "}
                <Dashboard />{" "}
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

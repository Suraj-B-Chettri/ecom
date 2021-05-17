import "./default.scss";
import HomePage from "./pages/HomePage";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions.js";
import { auth, handleUserProfile } from "./firebase/utils";
import WithAuth from "./hoc/withAuth";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Registration from "./pages/Registration";
import Login from "./pages/LoginPage";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

const App = (props) => {
  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
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
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

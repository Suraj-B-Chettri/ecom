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
import Admin from "./pages/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import AdminToolbar from "./components/AdminToolbar";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
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
          exact
          path="/search"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />

        <Route
          path="/search/:filterType"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />

        <Route
          path="/product/:productID"
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
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
          path="/cart"
          render={() => (
            <MainLayout>
              <Cart />
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
              <DashboardLayout>
                {" "}
                <Dashboard />{" "}
              </DashboardLayout>
            </WithAuth>
          )}
        />

        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                {" "}
                <Admin />{" "}
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

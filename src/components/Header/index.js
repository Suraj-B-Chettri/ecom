import React from "react";
import "./styles.scss";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const dispatch = useDispatch();

  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="main logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li key="0">
              <Link to="/">Home</Link>
            </li>

            <li key="1">
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li key="122">
              <Link to="/cart">Your Cart ({totalNumCartItems})</Link>
            </li>

            {currentUser && [
              <li key="0">
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li key="1">
                <span onClick={() => signOut()}>LogOut</span>
              </li>,
            ]}

            {!currentUser && [
              <li>
                <Link to="/signup">Register</Link>
              </li>,
              <li>
                <Link to="/login">Login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;

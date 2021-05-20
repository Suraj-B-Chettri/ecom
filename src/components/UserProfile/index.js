import React from "react";
import "./styles.scss";
import Logo from "../../assets/logo.png";
const UserProfile = (props) => {
  const { currentUser } = props;

  console.log(props);
  return (
    <div className="userProfile">
      <div className="wrap">
        <div className="avatar">
          <img className="displayImage" src={Logo} alt="main logo" />
        </div>
        <div className="displayName">
          <span>{currentUser && currentUser.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

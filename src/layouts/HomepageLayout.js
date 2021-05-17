import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomepageLayout = (props) => {
  return (
    <div className="layoutHeight">
      <Header {...props} />
      <div className="homepageHeight">{props.children}</div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;

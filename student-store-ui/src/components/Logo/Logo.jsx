import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/codepath.svg";
const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="codepath logo" />
      </Link>
    </div>
  );
};

export default Logo;

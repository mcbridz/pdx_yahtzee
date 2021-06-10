import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = (props) => {
  return (
    <div id="nav-bar">
      <Link to="/login" id="navbar-link">
        Login
      </Link>

      {/* <Link to="/logout" id="navbar-link">Logout</Link> */}

      <Link to="/register" id="navbar-link">
        Sign Up
      </Link>
    </div>
  );
};

export default NavBar;

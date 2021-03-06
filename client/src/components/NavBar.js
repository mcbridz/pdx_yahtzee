import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = (props) => {
  const logout = () => {
    props.setCredentials({ username: "", token: "" });
  };

  return (
    <div id="navbar">
      <div id="nav-bar-right">
        <div id="nav-bar-left">
          {props.credentials.username !== "" ? (
            <Link to="/mainlobby" id="navbar-link-left">
              Main Lobby
            </Link>
          ) : (
            <Link to="/" id="navbar-link-left">
              Home
            </Link>
          )}
        </div>
        {props.credentials.username === "" ? (
          <div>
            <Link to="/login" id="navbar-link-right">
              Login
            </Link>
            <Link to="/register" id="navbar-link-right">
              Sign Up
            </Link>{" "}
          </div>
        ) : (
          <div>
            <Link to={"/" + props.credentials.username} id="navbar-link-right">
              Profile
            </Link>
            <Link to="/" id="navbar-link-right" onClick={logout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

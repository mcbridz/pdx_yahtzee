import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FaUserCircle, FaLock } from "react-icons/fa";
import "../styles/Login.css";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const history = useHistory();

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  async function loginUser(user) {
    await fetch("http://localhost:8000/login/", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then(async (data) => {
        await props.setCredentials({
          username: user.username,

          token: data.token,
        });
        // history.push("/");
      });
    // .then(history.push("/"));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await loginUser(user).then(() => {
      history.push("/mainlobby");
    });
  };

  return (
    <div className="div-wrapper">
      <div className="login-container">
        <div className="login-logo">
          <h1>Log in to play!</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-username">
            <span id="user-icon">
              <FaUserCircle size={26} />
            </span>
            <input
              type="text"
              name="username"
              value={user.username}
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>
          <div className="login-pass">
            <span id="pass-icon">
              <FaLock size={26} />
            </span>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div id="login-btn-container">
            <button>Log In</button>
            <p>
              or{" "}
              <Link to="/register" id="login-link">
                Sign Up
              </Link>{" "}
              here.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

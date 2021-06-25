import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FaUserCircle, FaLock } from "react-icons/fa";
import "../styles/Login.css";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const history = useHistory();

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  async function loginUser(user) {
    await fetch("/login", {
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
        console.log("TOKEN RECEIVED");
        console.log(data);
        await props.setCredentials({
          username: user.username,
          token: data.token,
        });
      })
      .catch((err) => {
        console.log(err.message);
        setLoginError(err.message);
        console.log(loginError);
      });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await loginUser(user).then(() => {
      history.push("/mainlobby");
    });
  };

  return (
    <div className="div-wrapper">
      {loginError && <span style={{ color: "white" }}>{loginError}</span>}
      <p>{loginError}</p>
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
            <button>Sign In</button>
            <p id="signinp">
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

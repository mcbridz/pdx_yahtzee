import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../styles/Signup.css";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [passwordVerify, setPasswordVerify] = useState("");

  const history = useHistory();

  const handleChange = (evt) => {
    setNewUser({ [evt.target.name]: evt.target.value });
  };

  const handleVerifyPassChange = (evt) => {
    setPasswordVerify(evt.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      }),
    };
    fetch("/register", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/login"); //possibly update if receive signup error type message
      });
  }

  return (
    <div className="signup-container">
      <div class="signup-header">
        <h1>Sign Up Now!</h1>
      </div>
      <div className="signup-inputs-div">
        <form onSubmit={handleSubmit}>
          <div className="signup-input">
            <span className="signup-icon">
              <FaUserCircle size={26} />
            </span>
            <input
              value={newUser.username}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>

          <div className="signup-input">
            <span className="signup-icon">
              <FaLock size={26} />
            </span>
            <input
              value={newUser.password}
              onChange={handleChange}
              name="password"
              id="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="signup-input">
            <span className="signup-icon">
              <FaLock size={26} />
            </span>
            <input
              value={passwordVerify}
              onChange={handleVerifyPassChange}
              name="passwordVerify"
              placeholder="Re-type Password"
              type="password"
            />
          </div>

          <div className="firstLast">
            <span className="signup-icon">
              <FaUserCircle size={26} />
            </span>
            <input
              value={newUser.firstName}
              onChange={handleChange}
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
            <span className="signup-icon">
              <FaUserCircle size={26} />
            </span>
            <input
              value={newUser.lastName}
              onChange={handleChange}
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </div>

          <div className="signup-input">
            <span className="signup-icon">
              <MdEmail size={26} />
            </span>
            <input
              type="email"
              name="email"
              id="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="signup-btn-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

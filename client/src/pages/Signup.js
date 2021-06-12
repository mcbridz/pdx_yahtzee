import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [firstnameText, setFirstnameText] = useState("");
  const [lastnameText, setlastnameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const history = useHistory();

  function handleFirstnameChange(event) {
    setFirstnameText(event.target.value);
  }

  function handleLastnameChange(event) {
    setlastnameText(event.target.value);
  }

  function handleEmailChange(event) {
    setEmailText(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsernameText(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswordText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameText, password: passwordText }),
    };
    fetch("/register", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/login"); //possibly update if receive signup error type message
      });

    alert(`usernameis ${usernameText} and pword be ${passwordText}`);
  }

  return (
    <div>
      <div class="container mt-4">
        <div class="row justify-content-md-center">
          <div class="col col-lg-3 mt-2">
            <div class="text-center">
              <h1>SIGNUP</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="form-group mt-4">
                <input
                  value={firstnameText}
                  onChange={handleFirstnameChange}
                  class="form-control"
                  placeholder="Enter First Name"
                  type="text"
                />
              </div>
              <div class="form-group mt-4">
                <input
                  value={lastnameText}
                  onChange={handleLastnameChange}
                  class="form-control"
                  placeholder="Enter Last Name"
                  type="text"
                />
              </div>
              <div class="form-group mt-4">
                <input
                  value={emailText}
                  onChange={handleEmailChange}
                  class="form-control"
                  placeholder="Enter Email"
                  type="email"
                />
              </div>
              <div class="form-group">
                <input
                  value={usernameText}
                  onChange={handleUsernameChange}
                  class="form-control"
                  placeholder="Enter username"
                />
              </div>
              <div class="form-group">
                <input
                  value={passwordText}
                  onChange={handlePasswordChange}
                  class="form-control"
                  placeholder="Enter pword"
                />
              </div>
              <div class="form group text-center mb-2">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

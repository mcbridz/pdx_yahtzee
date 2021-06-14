import React from "react";
import { Link } from "react-router-dom";
import landinglogo from "../styles/images/clipart1003392.png";
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <br />
      <div id="landing-header-div">
        <h1 className="landing-logo1">Multiplayer Yahtzee</h1>
      </div>
      <div id="landing-logo-img">
        <img src={landinglogo} alt="dice-landing" />
      </div>
      <div id="site-description">
        {/* <h2>Welcome to Yahtzee!</h2> */}
        <p>Come play Yahtzee online with your friends...</p>
        <p>Uses socket.io to allow you to play and chat in real time...</p>
        <p>Not sure what to put here yet...</p>
        <p id="login-p">
          <Link to="/login" className="landing-link">
            Log In
          </Link>{" "}
          now to start playing, or{" "}
          <Link to="/register" className="landing-link">
            Sign Up
          </Link>{" "}
          if you don't have an account yet!{" "}
        </p>
      </div>
    </div>
  );
};

export default Landing;

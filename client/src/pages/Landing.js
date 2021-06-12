import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <h1 className="landing-logo">Multiplayer Yahtzee</h1>
      <div id="site-description">
        <h2>Welcome to Yahtzee!</h2>
        <p>Come play Yahtzee online with your friends...</p>
        <p>Uses socket.io to allow you to play and chat in real time...</p>
        <p>Not sure what to put here yet...</p>
        <p>
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

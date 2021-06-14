import React, { useCallback, useEffect } from "react";
import Chat from "../components/Chat";
import { Link, useHistory } from "react-router-dom";
import "../styles/MainLobby.css";

const MainLobby = (props) => {
  const history = useHistory();

  const checkLoginStatus = useCallback(() => {
    if (props.credentials.username === "") {
      history.push("/login");
    }
  }, [props.credentials, history]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <div id="main-lobby">
      <div className="main-lobby-header">
        <button>
          <Link to="/ingame">In Game Page</Link>
        </button>
        <h1 id="main-lobby-logo">Main Lobby</h1>
        <button className="host-game-button">Host a Game</button>
      </div>
      <div className="main-lobby-body">
        <div className="list-of-games-container">
          Games looking for players placeholder
        </div>
        <Chat value={0} version={1} credentials={props.credentials} />
      </div>
    </div>
  );
};

export default MainLobby;

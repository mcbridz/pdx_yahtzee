import React from "react";
import Chat from "../components/Chat";
import "../styles/MainLobby.css";

const MainLobby = (props) => {
  return (
    <div>
      <div className="main-lobby-header">
        <h1 id="main-lobby-logo">Main Lobby</h1>
        <button className="host-game-button">Host a Game</button>
      </div>
      <div className="main-lobby-body">
        <div className="list-of-games-container">Games looking for players placeholder</div>
        <Chat value={0} version={1} credentials={props.credentials} />
      </div>
    </div>
  );
};

export default MainLobby;

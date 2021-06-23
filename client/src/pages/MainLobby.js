import React, { useCallback, useEffect } from "react";
import Chat from "../components/Chat";
import { Link, useHistory } from "react-router-dom";
import "../styles/MainLobby.css";

const MainLobby = (props) => {
  const history = useHistory();

  const createGame = props.createGame;

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
        <h1 id="main-lobby-logo">Main Lobby</h1>
        <button onClick={createGame} className="host-game-button">
          Host a Game
        </button>
      </div>
      <div className="main-lobby-body">
        <div className="list-of-games-container">
          {props.gamesList.map((game) => {
            let joinThisGame = () => {
              return () => {
                console.log("JOINING GAME");
                console.log(props.credentials.token);
                console.log(game._id);
                props.joinGame(props.credentials.token, game._id);
              };
            };
            return (
              <div className="games-list">
                <div id="game-name">{game.host + "'s game"}</div>
                <div id="players-amount">
                  Players: {game.users.length + "/4"}
                </div>
                <div id="join-game-btn-div">
                  <button onClick={joinThisGame()} id="join-game-btn">
                    Join Game
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Chat
          value={0}
          version={1}
          credentials={props.credentials}
          message={props.message}
          setMessage={props.setMessage}
          messageList={props.messageList}
          setMessageList={props.setMessageList}
          gameState={props.gameState}
          sendMessage={props.sendMessage}
        />
      </div>
    </div>
  );
};

export default MainLobby;

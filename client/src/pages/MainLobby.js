import React, { useCallback, useEffect } from "react";
import Chat from "../components/Chat";
import { Link, useHistory } from "react-router-dom";
import "../styles/MainLobby.css";

const MainLobby = (props) => {
  const history = useHistory();

  const createGame = props.createGame

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
        <button onClick={createGame} className="host-game-button">Host a Game</button>
      </div>
      <div className="main-lobby-body">
        <div className="list-of-games-container">
          {props.gamesList.map(game => {
            let joinThisGame = () => {
              return () => {
                props.joinGame(props.credentials.token, game._id)
              }
            }
            return <div onClick={joinThisGame()}>
              {game.host + "'s game"}
            </div>
          })}
        </div>
        <Chat value={0} version={1} credentials={props.credentials} />
      </div>
    </div>
  );
};

export default MainLobby;

import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import GameBoard from "./pages/GameBoard";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import MainLobby from "./pages/MainLobby";
import Profile from "./pages/Profile";
import io from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

function App() {
  const [credentials, setCredentials] = useState({ username: "", token: "" });
  const [inPreGameLobby, setInPreGameLobby] = useState(false);

  const [game, setGame] = useState({
    users: [],
    scoreCards: [],
    public: true,
    started: false,
    currentPlayer: { id: "", username: "" },
  });

  //the below will need to be updated as we develop the invite system
  //and options for public or private games
  const createGame = function (playerList, isPrivate) {
    socket.emit("createGame", {
      public: true,
      playerList: [credentials.token]
    })
  }

  const [scoreCard, setScoreCard] = useState({
    id: "",
    game: "",
    gameNum: "",
    player: "",
    upperSection: [
      { aces: 13, marked: false, value: 1 },
      { twos: 0, marked: false, value: 2 },
      { threes: 0, marked: false, value: 3 },
      { fours: 0, marked: false, value: 4 },
      { fives: 0, marked: false, value: 5 },
      { sixes: 0, marked: false, value: 6 },
    ],
    bonus: 0,
    upperSectionTotal: 0,
    lowerSection: [
      { threeOfAKind: 0, marked: false, score: 0 },
      { fourOfAKind: 0, marked: false, score: 0 },
      { fullHouse: 0, value: 25, marked: false },
      { smStraight: 0, value: 30, marked: false },
      { lgStraight: 0, value: 40, marked: false },
      { yahtzee: 0, value: 50, marked: false },
      { chance: 0, marked: false, score: 0 },
    ],
    yahtzeeBonus: { score: 0, numYahtzees: 0 },
    // chance: { score: 0, marked: false },
    lowerSectionTotal: 0,
    grandTotal: 0,
  });

  const [gamesList, setGamesList] = useState([]);

  const token = credentials.token;
  const history = useHistory();

  useEffect(() => {
    socket.on("createGame", (game) => {
      console.log(JSON.parse(game));
      setGame(JSON.parse(game));
    });
    socket.on("getUnstartedGames", (list) => {
      setGamesList(JSON.parse(list));
    });
    socket.on("markScore", (gameObj) => {
      let gameJSON = JSON.parse(gameObj);
      console.log(gameJSON);
      console.log(game.currentPlayer.username);
      const currentPlayerScoreCard = gameJSON.scoreCards.filter(
        (scoreCard) =>
          gameJSON.currentPlayer.username.trim() == scoreCard.player.trim()
      )[0];
      console.log(currentPlayerScoreCard);
      setGame(gameJSON);
      // setScoreCard(currentPlayerScoreCard);
    });
    // socket.on("diceRoll", (dice) => {
    //   setDice(JSON.parse(dice));
    // });
    socket.on("startGame", (game) => {
      // console.log(JSON.parse(game))
      setGame(JSON.parse(game));
    });
    socket.on("endGame", (game) => {
      setGame(JSON.parse(game));
    });
    socket.on("addPlayer", (game) => {
      // console.log('new player added')
      // console.log(JSON.parse(game))
      setGame(JSON.parse(game));
    });
    socket.on("removePlayer", (game) => {
      console.log("player removed on database");
      console.log(JSON.parse(game));
      setGame(JSON.parse(game));
    });
  }, []);

  return (
    <div className="App">
      <NavBar credentials={credentials} setCredentials={setCredentials} />

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/login">
          <Login credentials={credentials} setCredentials={setCredentials} />
        </Route>

        <Route path="/register">
          <Signup />
        </Route>

        <Route path="/ingame">
          <GameBoard
            credentials={credentials}
            scoreCard={scoreCard}
            setScoreCard={setScoreCard}
          />
        </Route>

        <Route path="/mainlobby">
          <MainLobby
            credentials={credentials}
            inPreGameLobby={inPreGameLobby}
            setInPreGameLobby={setInPreGameLobby}
            gamesList={gamesList}
            setGamesList={setGamesList}
            createGame={createGame}
          />
        </Route>

        {/* <Route path={"/" + credentials.username}>
          <Profile credentials={credentials} setCredentials={setCredentials} />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;

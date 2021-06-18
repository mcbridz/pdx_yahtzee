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
  const [room, setRoom] = useState("");

  const [game, setGame] = useState({
    _id: null,
    users: [],
    scoreCards: [],
    public: true,
    started: false,
    currentPlayer: { id: "", username: "" },
    host: "",
  });

  const [scoreCard, setScoreCard] = useState({
    id: "",
    game: "",
    gameNum: "",
    player: "",
    upperSection: [
      { aces: 0, marked: false, value: 1 },
      { twos: 0, marked: false, value: 2 },
      { threes: 0, marked: false, value: 3 },
      { fours: 0, marked: false, value: 4 },
      { fives: 0, marked: false, value: 5 },
      { sixes: 0, marked: false, value: 6 },
    ],
    bonus: 0,
    upperSectionTotal: 0,
    lowerSection: [
      { threeOfAKind: 0, marked: false },
      { fourOfAKind: 0, marked: false },
      { fullHouse: 0, value: 25, marked: false },
      { smStraight: 0, value: 30, marked: false },
      { lgStraight: 0, value: 40, marked: false },
      { yahtzee: 0, value: 50, marked: false },
      { chance: 0, marked: false },
    ],
    yahtzeeBonus: { score: 0, numYahtzees: 0 },
    // chance: { score: 0, marked: false },
    lowerSectionTotal: 0,
    grandTotal: 0,
  });

  const [gamesList, setGamesList] = useState([]);

  const token = credentials.token;
  const history = useHistory();

  const numOfDice = 5;
  const numOfRolls = 3;
  const [locked, setLocked] = useState(Array(numOfDice).fill(false));
  const [dice, setDice] = useState(Array.from({ length: numOfDice }));
  const [rolling, setRolling] = useState(false);
  const [rollsRemaining, setRollsRemaining] = useState(numOfRolls);

  const [ourTurn, setOurTurn] = useState(
    game.currentPlayer === credentials.username
  );

  useEffect(() => {
    if (!credentials.username) {
      return;
    }
    socket.on("createGame", (game) => {
      console.log(JSON.parse(game));
      setGame(JSON.parse(game));
      //setting in-game flags for user (transition page)
      history.push("/ingame");
    });
    socket.on("getUnstartedGames", (list) => {
      setGamesList(JSON.parse(list));
    });
    socket.on("markScore", (gameObj) => {
      let gameJSON = JSON.parse(gameObj);
      console.log(gameJSON);
      console.log(gameJSON.currentPlayer);
      const currentPlayerScoreCard = gameJSON.scoreCards.filter(
        (scoreCard) => credentials.username == scoreCard.player.trim()
      )[0];
      if (gameJSON.currentPlayer.username === credentials.username) {
        setLocked(Array(numOfDice).fill(false));
        setDice(Array.from({ length: numOfDice }));
        setRolling(false);
        setRollsRemaining(numOfRolls);
        if (!ourTurn) {
          setOurTurn(true);
        }
      } else {
        setRollsRemaining(0);
        setLocked(Array(numOfDice).fill(true));
        setOurTurn(false);
      }
      console.log(currentPlayerScoreCard);
      setGame(gameJSON);
      setScoreCard(currentPlayerScoreCard);
    });
    socket.on("diceRoll", (dice) => {
      if (!ourTurn) {
        setDice(JSON.parse(dice));
      }
    });
    socket.on("startGame", (game) => {
      console.log("STARTED GAME");
      const newGame = JSON.parse(game);
      setGame(newGame);
      console.log("newGame");
      console.log(newGame);
      let scorecard = newGame.scoreCards.filter(
        (scorecard) => scorecard.player === credentials.username
      )[0];
      // console.log('scorecard')
      // console.log(scorecard.player)
      // console.log('credentials')
      // console.log(credentials.username)
      // console.log(scorecard.player.trim() === credentials.username.trim())
      setScoreCard(scorecard);
      // console.log('scoreCard')
      // console.log(scoreCard)
      if (!scoreCard) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAScorecard!");
        // findMyScoreCard(newGame, credentials);
      }
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
    socket.on("get rooms", (rooms) => {
      setGamesList(rooms);
    });
    socket.on("get messages", (msgObj) => {
      console.log(msgObj);
      if (msgObj.private === true && msgObj.room === game._id) {
        //message meant for user in game
      } else if (msgObj.private === false && game._id === null) {
        //message meant for user -main lobby/public room
      } else if (msgObj.private === true && msgObj.room === room) {
        //message meant for user -private room
      }
    });
    socket.on("get games", (games) => {
      console.log("THESE GAMES RECEIVED");
      // if (typeof (games) === "object") {
      //   if (games._id) {
      //     setGamesList(games)
      //   }
      //   return
      // }
      console.log(games);
      setGamesList(games);
    });
    //emitters stay at the bottom
    socket.emit("get games", { started: false });
  }, [credentials]);

  ///////////////////////////////////////
  //         Prop Functions
  //////////////////////////////////////

  //the below will need to be updated as we develop the invite system
  //and options for public or private games
  const createGame = function (playerList, isPrivate) {
    console.log("PLAYER");
    console.log(credentials);
    socket.emit("createGame", {
      public: true,
      playerList: [credentials.token],
    });
  };

  const markScore = function (taskObj) {
    console.log("Sending the following task: ");
    console.log(taskObj);
    socket.emit("markScore", taskObj);
  };

  const startGame = (id) => {
    return () => {
      socket.emit("startGame", id);
    };
  };

  const setMyCredentials = () => {
    return (inputObj) => {
      console.log("setMyCredentials triggered");
      console.log(inputObj);
      setCredentials(inputObj);
    };
  };

  const emitDice = (newDice) => {
    socket.emit("diceRoll", JSON.stringify(newDice));
  };

  const joinGame = (userToken, gameID) => {
    socket.emit("join game", { token: userToken, game: gameID });
  };

  return (
    <div className="App">
      <NavBar credentials={credentials} setCredentials={setCredentials} />

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/login">
          <Login
            credentials={credentials}
            setCredentials={setMyCredentials()}
          />
        </Route>

        <Route path="/register">
          <Signup />
        </Route>

        <Route path="/ingame">
          <GameBoard
            credentials={credentials}
            scoreCard={scoreCard}
            setScoreCard={setScoreCard}
            markScore={markScore}
            gameState={game}
            startGame={startGame}
            locked={locked}
            setLocked={setLocked}
            dice={dice}
            setDice={setDice}
            rolling={rolling}
            setRolling={setRolling}
            rollsRemaining={rollsRemaining}
            setRollsRemaining={setRollsRemaining}
            emitDice={emitDice}
            ourTurn={ourTurn}
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
            joinGame={joinGame}
          />
        </Route>

        <Route path={"/" + credentials.username}>
          <Profile credentials={credentials} setCredentials={setCredentials} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

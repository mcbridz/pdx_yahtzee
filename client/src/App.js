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
import socket from "./ioFile"; //Development
// import io from "socket.io"; //Production
console.log(process.env);

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
  const [port, setPort] = useState(8000);
  const [listening, setListening] = useState(false);
  const [opposingPlayers, setOpposingPlayers] = useState([]);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [ourTurn, setOurTurn] = useState(false);

  function cloneObject(obj) {
    var clone = {};
    for (var i in obj) {
      if (typeof obj[i] == "object" && obj[i] != null)
        clone[i] = cloneObject(obj[i]);
      else clone[i] = obj[i];
    }
    return clone;
  }

  const copyMessageData = (msgArr, newMsg) => {
    let newMessageArr = [];
    msgArr.forEach((msgObj) => {
      let newObj = cloneObject(msgObj);
      console.log("PUSHING THIS OLD MESSAGE");
      newMessageArr.push(newObj);
    });
    console.log(newMessageArr);
    console.log("PUSHING THE FOLLOWING MESSAGE");
    console.log(newMsg);
    const count = newMessageArr.push(newMsg);
    console.log("NEW MESSAGE ARRAY IS NOW LENGTH: " + count.toString());
    return newMessageArr;
  };

  const parseMessages = (msgArr, propMessageList) => {
    // console.log(msgArr)
    console.log(propMessageList);
    let msgListIDs = [];
    propMessageList.map((msg) => msgListIDs.push(msg._id));
    console.log(msgListIDs);
    console.log("Message List PRIOR to adding message");
    console.log(msgArr);
    var newArr = [];
    msgArr.forEach((msgObj) => {
      if (
        msgObj.private === true &&
        msgObj.room === game._id &&
        !msgListIDs.includes(msgObj._id)
      ) {
        newArr.push(msgObj);
        console.log(newArr);
      } else if (
        msgObj.private === false &&
        game._id === null &&
        !msgListIDs.includes(msgObj._id)
      ) {
        newArr.push(msgObj);
        console.log(newArr);
      } else if (
        msgObj.private === true &&
        msgObj.room === room &&
        !msgListIDs.includes(msgObj._id)
      ) {
        newArr.push(msgObj);
        console.log(newArr);
      }
      console.log("END OF PARSE MESSAGE FOREACH ON INCOMING ARR");
      console.log(newArr);
    });
    return newArr;
  };
  useEffect(() => {
    //Production
    if (!credentials.username) {
      console.log(
        "Not running useEffect code, trying set construct socket and set listeners for connect/disconnect"
      );
      // let socket = io() //Production
      socket.on("connect", () => console.log(socket.connected));
      socket.on("disconnect", () => console.log(socket.connected));
      socket.on("get messages", (msgObj) => {
        let parsedData = JSON.parse(msgObj).data;
        console.log(parsedData);
        let newMessages = parseMessages(parsedData, messageList);
        console.log("newMessages");
        console.log(newMessages);
        // let tempArr = messageList
        let toBeSetArr = messageList.concat(newMessages);
        console.log("The best named Arr ever");
        console.log(toBeSetArr);
        setMessageList(toBeSetArr);
      });
      return;
    } else if (!listening) {
      console.log("Running useEffect code");
      console.log("Checking socket's connection status");
      console.log(socket.connected);
      socket.on("createGame", (game) => {
        const gamePlayers = JSON.parse(game).users.map((user) => {
          return user.username;
        });

        if (gamePlayers.includes(credentials.username)) {
          console.log(JSON.parse(game));
          setGame(JSON.parse(game));
          //setting in-game flags for user (transition page)
          history.push("/ingame");
        }
      });
      // socket.on("getUnstartedGames", (list) => {
      //   setGamesList(JSON.parse(list).data);
      // });
      socket.on("get games", (gamesObj) => {
        console.log(gamesObj);
        let gamesArr = gamesObj.data;
        console.log(gamesArr);
        setGamesList(gamesArr);
      });
      socket.on("markScore", (gameObj) => {
        let gameJSON = JSON.parse(gameObj);
        console.log(gameJSON);
        console.log(gameJSON.currentPlayer);
        const currentPlayerScoreCard = gameJSON.scoreCards.filter(
          (scoreCard) => credentials.username == scoreCard.player.trim()
        )[0];
        // console.log("currentPlayer.username", game.currentPlayer.username);
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
        let opposingScoreCards = newGame.scoreCards.filter(
          (scorecard) => scorecard.player !== credentials.username
        );
        setOpposingPlayers(opposingScoreCards);
        // console.log("opposing scorecards", opposingScoreCards);
        // console.log('scorecard')
        // console.log(scorecard.player)
        // console.log('credentials')
        // console.log(credentials.username)
        // console.log(scorecard.player.trim() === credentials.username.trim())
        setScoreCard(scorecard);
        // console.log('scoreCard')
        // console.log(scoreCard)
        console.log("game host", game.host);
        if (newGame.currentPlayer.username === credentials.username) {
          setOurTurn(true);
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
      //emitters stay at the bottom
      socket.emit("get games", { started: false });
      setListening(true);

      //Development

      // return () => {
      //   socket.removeAllListeners();
      // };

      //Production
    }
  }, [credentials, listening, messageList]);
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
    socket.emit("addPlayer", { token: userToken, game: gameID });
  };

  const sendMessage = (msgObj) => {
    socket.emit("new message", JSON.stringify(msgObj));
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
            setPort={setPort}
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
            opposingPlayers={opposingPlayers}
            message={message}
            setMessage={setMessage}
            messageList={messageList}
            setMessageList={setMessageList}
            sendMessage={sendMessage}
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
            message={message}
            setMessage={setMessage}
            messageList={messageList}
            setMessageList={setMessageList}
            gameState={game}
            sendMessage={sendMessage}
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

const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const Game = require("./game_models/game");
const User = require("./protected_routes/userModel");
const jwt = require("jsonwebtoken");
const key = process.env.KEY || require("../secrets").key;
const Room = require("./chatroom/chatModels").Room;
const Message = require("./chatroom/chatModels").Message;

const app = express();

if (process.env.PORT) {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
} else {
  app.use(express.static("static"));
}
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const loginRoute = require("./unprotected_routes/login");
app.use("/", loginRoute);
const registerRoute = require("./unprotected_routes/register");
app.use("/", registerRoute);
const editUserRoute = require("./protected_routes/editUsers");
app.use("/", editUserRoute);
// app.set('port', (process.env.PORT || 3000))

module.exports = function (deps) {
  const mongoose = require("mongoose");
  const url = process.env.MONGODB_URI || "mongodb://localhost/" + deps.dbname;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  if (!process.env.PORT) {
    app.get("/", (req, res) => {
      res.status(200).send("Hello World!");
    });
  }
  if (process.env.KEY) {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    });
  }
  const server = require("http").createServer(app);
  let io = null;
  if (process.env.NODE_ENV === "production") {
    console.log("Build mode detected");
    console.log(process.env.PORT);
    io = require("socket.io")(server);
  } else {
    io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    console.log("Development mode detected");
  }

  const mapAwaiter = (list, callback) => {
    return Promise.all(list.map(callback));
  };

  io.on("connection", async (socket) => {
    console.log("a user has connected: " + socket.id);
    socket.on("get games", async function (pass) {
      let games = await Game.getUnstartedGames();
      io.emit("get games", { data: games });
    });
    let messageArr = await Message.getMessages({ private: false });
    // console.log("messageArr");
    // console.log(messageArr);
    let messagePackage = { data: messageArr };
    // console.log("messagePackage");
    // console.log(messagePackage);
    let messagePackageStr = JSON.stringify(messagePackage);
    // let messages = JSON.stringify({ data: await Message.getMessages({ private: false }) })
    let messages = messagePackageStr;
    // console.log("Sending Messages");
    socket.emit("get messages", messages);

    // order is an object, with the structure of:
    // { public: <true/false>, playerList: [playerIDTOKEN, playerIDTOKEN, playerIDTOKEN] }
    socket.on("createGame", async function (order) {
      // console.log("CREATE GAME order");
      // console.log(order);
      let idList = order.playerList;
      let usernameList = [];
      await mapAwaiter(idList, async function (token) {
        const id = jwt.decode(token, key)._id;
        // console.log(id)
        const userQ = await User.findOne({ _id: id });
        // console.log(username)
        const user = { id: id, username: userQ.username };
        usernameList.push(user);
        // console.log(usernameList)
      });
      // console.log(usernameList)
      Game.createGame(usernameList, order.public).then(async (game) => {
        //Emit game first
        // console.log(JSON.stringify(game))
        io.emit("createGame", JSON.stringify(game));

        //GetGames second, async buffer for client
        // console.log("backbone.js");
        // console.log(game);
        const games = await Game.getGames({ public: true, started: false, turnNum: 0 });
        io.emit("get games", { data: games });

        //Message Last, hopefully client has received createGame emit and emptied messageList
        // newMessage = await Message.systemMessage("Game Created", game.room);
        // console.log("SYSTEM CREATE GAME MESSAGE");
        // console.log(newMessage);
        // setTimeout(() => { io.emit("get messages", JSON.stringify({ data: [newMessage] })); }, 2000)
      });
    });

    // order is an object, with the structure of:
    // { game: <game._id>, player: <playerIDTOKEN> }
    socket.on("addPlayer", async function (order) {
      // console.log('adding player')
      // console.log(order)
      // const id = jwt.decode(order.token, key)._id
      // console.log(id)
      let user = await User.findOne({ _id: jwt.decode(order.token, key)._id });
      let game = await Game.findOne({ _id: order.game });
      // console.log(user);
      if (!game.started) {
        game = await game.addPlayer({ id: user._id, username: user.username });
      }
      // console.log("SENDING THIS GAME:");
      // console.log(game);
      io.emit("createGame", JSON.stringify(game));
    });

    // order is an object, with the structure of:
    // { game: <game._id>, player: <playerIDTOKEN> }
    socket.on("removePlayer", async function (order) {
      // console.log("order is: ");
      // console.log(order);
      let user = await User.findOne({ _id: jwt.decode(order.player, key) });
      let game = await Game.findOne({ _id: order.game });
      io.emit("removePlayer", JSON.stringify(await game.removePlayer(user)));
    });

    // taskObj = {game: gameID, scoreCard: scoreCardID, tasks: [{task: name, data: data}, {task: name2, data: data2}]}
    // data inside taskObj:
    // data = {'markOnes', <number of ones dice>, 'markSixes', <number of sixes dice>}
    socket.on("markScore", async function (taskObj) {
      // these are for emitting SYSTEM messages higher in the call stack
      // taskObj.io = io;
      // taskObj.ioEmit = function (message) {
      //   // console.log("Emitting off of taskObj in markScore from backbone.js");
      //   this.io.emit("get messages", JSON.stringify(message));
      // };
      // console.log(taskObj);
      if (taskObj.game && taskObj.scoreCard) {
        let game = await Game.findOne({ _id: taskObj.game });
        // console.log("//////////////////Game //////////////");
        // console.log(game);
        // console.log('//////////////////Sending In //////////////')
        // console.log(game.scoreCards[0])
        game = await game.performTasks(taskObj);
        // console.log("//////////////////Sending Back ////////////");
        // console.log(game);
        io.emit("markScore", JSON.stringify(game));
      } else {
        console.log("NO DATA FOUND, NO WAY TO SEND MESSAGE BACK");
      }
    });

    socket.on("diceRoll", (diceArr) => {
      io.emit("diceRoll", diceArr);
    });

    socket.on("startGame", async function (gameID) {
      let game = await Game.findOne({ _id: gameID });
      game = await game.startGame();
      io.emit("startGame", JSON.stringify(game));
    });

    socket.on("endGame", async function (gameID) {
      let game = await Game.findOne({ _id: gameID });
      await game.endGame();
      io.emit("endGame", JSON.stringify(game));
    });

    socket.on("new room", (room) => {
      Room.newRoom(room);
      if (!Room.private) {
        io.emit("new room", room);
      }
    });
    socket.on("new message", async (msgObj) => {
      let newMessage = await Message.newMessage(JSON.parse(msgObj));
      // console.log("NEW MESSAGE");
      // console.log(newMessage);
      io.emit("get messages", JSON.stringify({ data: [newMessage] }));
    });
    socket.on("get messages", async (filter) => {
      let newFilter = JSON.parse(filter);
      // console.log("FILTER");
      // console.log(newFilter);
      let messages = await Message.getMessages(newFilter);
      // console.log("MESSAGES");
      // console.log(messages);
      let output = JSON.stringify({ data: messages });
      // JSON.stringify(await Message.getMessages(JSON.parse(filter)))
      io.emit("get messages", output);
    });
    socket.on("get rooms", (filter) => {
      io.emit("get rooms", Room.getRooms(filter));
    });

    setInterval(() => {
      console.log("PUH-PUH");
      socket.emit("heartbeat", JSON.stringify({}));
    }, 5000);
  });

  return server;
};

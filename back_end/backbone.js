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

module.exports = function (deps) {
    const mongoose = require('mongoose')
    const url = process.env.MONGODB_URI || 'mongodb://localhost/' + deps.dbname
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    if (!process.env.PORT) {
        app.get('/', (req, res) => {
            res.status(200).send('Hello World!')
        })
    }
    if (process.env.KEY) {
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
        })
    }
    const server = require('http').createServer(app)

    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })

    const mapAwaiter = (list, callback) => {
        return Promise.all(list.map(callback))
    }

    io.on('connection', (socket) => {
        console.log('a user has connected')

        socket.on('getUnstartedGames', async function (pass) {
            let games = await Game.getUnstartedGames()
            io.emit(JSON.stringify(games))
        })

        // order is an object, with the structure of:
        // { public: <true/false>, playerList: [playerIDTOKEN, playerIDTOKEN, playerIDTOKEN] }
        socket.on('createGame', async function (order) {
            let idList = order.playerList
            let usernameList = []
            await mapAwaiter(idList, async function (token) {
                const id = jwt.decode(token, key)._id
                // console.log(id)
                const userQ = await User.findOne({ _id: id })
                // console.log(username)
                const user = { id: id, username: userQ.username }
                usernameList.push(user)
                // console.log(usernameList)
            })
            // console.log(usernameList)
            Game.createGame(usernameList, order.public)
                .then((game) => {
                    // console.log(JSON.stringify(game))
                    io.emit('createGame', JSON.stringify(game))                
            })
        })
    

        // order is an object, with the structure of:
        // { game: <game._id>, player: <playerIDTOKEN> }
        socket.on('addPlayer', async function (order) {
            // console.log('adding player')
            let user = await User.findOne({ _id: jwt.decode(order.player, key)._id })
            let game = await Game.findOne({ _id: order.game })
            // console.log(user)
            if (!game.started) {
                game = await game.addPlayer({ id: user._id, username: user.username })
            }
            // console.log('SENDING THIS GAME:')
            // console.log(game)
            io.emit('addPlayer', JSON.stringify(game))
        })
        
        // order is an object, with the structure of:
        // { game: <game._id>, player: <playerIDTOKEN> }
        socket.on('removePlayer', async function (order) {
            let user = await User.findOne({ _id: jwt.decode(order.player, key) })
            let game = await Game.findOne({ _id: order.game })
            io.emit('removePlayer', JSON.stringify(await game.removePlayer(user)))
        })

        // taskObj = {game: gameID, scoreCard: scoreCardID, tasks: [{task: name, data: data}, {task: name2, data: data2}]}
        // data inside taskObj:
        // data = {'markOnes', <number of ones dice>, 'markSixes', <number of sixes dice>}
        socket.on('markScore', async function (taskObj) {
            let game = await Game.findOne({ _id: taskObj.game })
            await game.performTasks(taskObj)
            io.emit('markScore', JSON.stringify(game))
        })

        socket.on('diceRoll', (numRolls) => {
            let rolls = []
            for (let i = 0; i < numRolls; i++){
                rolls.push(Math.floor(Math.random()*6))
            }
            io.emit('diceRoll', JSON.stringify(rolls))
        })

        socket.on('startGame', async function (gameID) {
            let game = await Game.findOne({ _id: gameID })
            await game.startGame()
            io.emit('startGame', JSON.stringify(game))
        })

        socket.on('endGame', async function (gameID) {
            let game = await Game.findOne({ _id: gameID })
            await game.endGame()
            io.emit('endGame', JSON.stringify(game))
        })

        socket.on("connect-to-room", (room) => {
            socket.join(room);
            console.log("Joined room " + room);
          });
    })


    return server
}

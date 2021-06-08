const express = require('express')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()


if (process.env.PORT) {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
} else {
    app.use(express.static('static'))    
}
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
const loginRoute = require('./unprotected_routes/login')
app.use('/', loginRoute)
const registerRoute = require('./unprotected_routes/register')
app.use('/', registerRoute)

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


    return server
}
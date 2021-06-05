const express = require('express')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const morgan = require('morgan')



const app = express()


app.use(express.static('static'))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

module.exports = function (deps) {
    const mongoose = require('mongoose')
    const url = 'mongodb://localhost/' + deps.dbname
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,        
    })
    app.get('/', (req, res) => {
        res.status(200).send('Hello World!')
    })

    const server = require('http').createServer(app)

    const io = require("socket.io")(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
    })
    

    return server
}
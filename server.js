require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 8000
const DATA_PATH = './data'
const DB_NAME = 'yahtzee'
const KEY = process.env.KEY || require('./secrets').key

const app = require('./back_end/backbone')({ dataPath: DATA_PATH, dbname: DB_NAME, key: KEY })
// if (process.env.PORT) {
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "client", "build", "index.html"))
//     })
// }
app.listen(port)

console.log('server listening on port: ' + port + '...')
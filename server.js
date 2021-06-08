require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 8000
const DATA_PATH = './data'
const DB_NAME = 'yahtzee'
const KEY = process.env.KEY || require('./secrets').key

const app = require('./back_end/backbone')({ dataPath: DATA_PATH, dbname: DB_NAME, key: KEY })
app.listen(port)

console.log('server listening on port: ' + port + '...')
const port = 8000
const DATA_PATH = './data'
const DB_NAME = 'yahtzee'

const app = require('./back_end/backbone')({ dataPath: DATA_PATH, dbname: DB_NAME })

app.listen(port)

console.log('server listening on port: ' + port + '...')
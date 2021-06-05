const port = 8000
const DATA_PATH = './data'

const app = require('./back_end/backbone')({ dataPath: DATA_PATH })

app.listen(port)

console.log('server listening on port: ' + port + '...')
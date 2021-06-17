const mongoose = require('mongoose')
const ScoreCard = require('./scoreCard')
const Room = require('../chatroom/chatModels').Room
const Message = require('../chatroom/chatModels').Message
const User = require('../protected_routes/userModel')

const upperSectionRef = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes']
const lowerSectionRef = ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smStraight', 'lgStraight', 'yahtzee']

const mapAwaiter = (list, callback) => {
    return Promise.all(list.map(callback))
}

const Schema = mongoose.Schema

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const gameSchema = new Schema({
    users: {
        type: Array,
        default: [],
        required: true
    },
    scoreCards: {
        type: Array,
        default: [],
        required: true
    },
    public: {
        type: Boolean,
        required: true
    },
    started: {
        type: Boolean,
        default: false,
        required: true
    },
    currentPlayer: {
        type: Object
    },
    turnNum: {
        type: Number,
        default: 0
    },
    room: {
        type: String,
        required: true
    }
})


// Figure out how second, third, etc game cards are created
gameSchema.statics.createGame = async function (playerList, public) {
    const game = new this()
    // console.log('///////////////////////////////////')
    // console.log(public)
    newRoom = await Room.newRoom({ name: game._id, private: true })
    game.room = newRoom._id
    game.public = public
    // console.log(newRoom)
    // console.log(game.room)
    // console.log('game.js playerList')
    // console.log(playerList)
    await mapAwaiter(playerList, async (playerObj, index) => {
        game.users.push(playerObj)
        const card = await ScoreCard.create(game._id, 1, playerObj.username)
        // console.log(card)
        // console.log('/////////////////created card/////////////')
        game.scoreCards.push(card.packCard())
    })
    console.log('game.js')
    console.log(game)
    return game.save()
    // console.log(game)
    // return game

}


// taskObj = {game: gameID, scoreCard: scoreCardID, tasks: [{task: name, data: data}, {task: name2, data: data2}]}
// data inside taskObj:
// data = {'markOnes', <number of ones dice>, 'markSixes', <number of sixes dice>}


gameSchema.statics.newGame = function (playerList) {
    let usernameList = []
    playerList.map(async function (playerObj) {
        usernameList.push({ username: playerObj.username, userID: playerObj.id })
    })
    return {
        public: null,
        players: usernameList
    }
}

gameSchema.statics.getUnstartedGames = function () {
    return this.find({ started: false })
}

gameSchema.methods.addPlayer = async function (player) {
    this.users.push(player)
    const scoreCard = new ScoreCard()
    scoreCard.game = this._id
    scoreCard.gameNum = 1
    scoreCard.player = player.username
    await scoreCard.save()
    this.scoreCards.push(scoreCard.packCard())
    return this.save()
}

gameSchema.methods.removePlayer = function (user) {
    // const index = this.users.find(obj => obj.id === user)
    console.log('removing player: ' + user._id)
    let newList = this.users.filter(playerObj => !user._id.equals(playerObj.id))
    // for (let i = 0; i < this.users.length; ++i){
    //     console.log(this.users[i].id.toString())
    //     console.log(user._id.toString())
    //     let tempString = this.users[i].id.toString()
    //     console.log(user._id.equals(this.users[i].id.toString()))
    // }
    // console.log(newList)
    this.users = newList
    const newCardsArr = this.scoreCards.filter((scoreCard => user.username.trim() != scoreCard.player.trim()))
    // console.log(newCardsArr)
    this.scoreCards = newCardsArr
    //need logic here to remove scorecards
    return this.save()
}

gameSchema.methods.getCurrentPlayer = function () {
    return this.currentPlayer.id
}

gameSchema.methods.startGame = function () {
    this.currentPlayer = this.users[0]
    this.started = true
    return this.save()
}

gameSchema.methods.endGame = function () {
    this.started = false
    return this.save()
}
gameSchema.methods.performTasks = async function (taskObj) {
    console.log(taskObj)
    let scoreCard = await ScoreCard.findById(taskObj.scoreCard)
    console.log('////////////////////////')
    console.log('scoreCard to be bound: ')
    console.log(scoreCard)
    console.log('taskObj.task')
    console.log(taskObj.tasks[0])
    taskObj.tasks.forEach(async (subTaskObj) => {
        await ScoreCard.prototype.$__schema.methods[subTaskObj.task].call(scoreCard, taskObj.data, taskObj, this.room)
    })
    // scoreCard = scoreCard.markSixes(taskObj.tasks[0].data)
    // console.log(scoreCard)
    // await scoreCard.save()
    let index = this.scoreCards.findIndex(scorecard => scoreCard._id.equals(scorecard.id))
    // console.log('Working on updating packed game scoreCards')
    // console.log('Index of desired scoreCard: ')
    // console.log(index)
    this.scoreCards[index] = scoreCard.packCard()
    // console.log('///////////////////')
    // console.log('This game\'s scorecards: ')
    // console.log(this.scoreCards[index])
    this.currentPlayer = this.users[(index + 1) % this.users.length]
    this.turnNum = this.turnNum + taskObj.tasks.length


    ////////////////////////////////////////
    // System Messages
    ///////////////////////////////////////
    const messageText = `${this.currentPlayer.username} scores ${taskObj.tasks[0].task}`
    const newMessage = Message.systemMessage(messageText, this.room)
    taskObj.ioEmit(newMessage)
    return this.save()
}


const Game = mongoose.model('Game', gameSchema)

module.exports = Game
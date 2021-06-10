const mongoose = require('mongoose')
const ScoreCard = require('./scoreCard')
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
    }
})

gameSchema.statics.createGame = async function (playerList, public) {
    const game = new this()
    game.public = public
    // console.log('game.js playerList')
    // console.log(playerList)
    await mapAwaiter(playerList, async (playerObj, index) => {
        game.users.push(playerObj)
        let card = await ScoreCard.create(game._id, 1, playerObj.username)
            .then((card) => {
                // console.log(card)
                // console.log('/////////////////created card/////////////')
                game.scoreCards.push(card.packCard())
            })
    })    
    return game.save()
    // console.log(game)
    // return game
    
}


// taskObj = {game: gameID, scoreCard: scoreCardID, tasks: [{task: name, data: data}, {task: name2, data: data2}]}
// data inside taskObj:
// data = {'markOnes', <number of ones dice>, 'markSixes', <number of sixes dice>}

gameSchema.statics.performTasks = async function (taskObj) {
    const scoreCard = await ScoreCard.findOne({ _id: taskObj.scoreCard })
    taskObj.tasks.map((task, data) => {
        scoreCard[task](data)
    })
    scoreCard.save()
    let index = this.scorecards.find(scorecard => scorecard.id === scoreCard._id)
    this.scorecards[index] = scoreCard.packCard()
    return this.save()    
}

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

gameSchema.methods.removePlayer = function (playerID) {
    // const index = this.users.find(obj => obj.id === playerID)
    console.log('removing player: ' + playerID._id)
    let newList = this.users.filter(playerObj => playerObj.id !== playerID._id)
    console.log(newList)
    this.users = newList
    const newCardsArr = this.scoreCards.filter((playerObj => playerObj.id !== playerID))
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

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
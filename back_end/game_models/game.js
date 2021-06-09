const mongoose = require('mongoose')
const ScoreCard = require('./scoreCard')
const User = require('../protected_routes/userModel')

const upperSectionRef = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes']
const lowerSectionRef = ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smStraight', 'lgStraight', 'yahtzee']

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
    playerList.map(playerObj => {
        game.users.push(playerObj)
        scoreCard = ScoreCard.create(game._id, 1, playerObj.id)
        game.scoreCards.push(scoreCard.packCard())
    })
    await game.save()
    return game
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
    await this.save()
}

gameSchema.methods.removePlayer = async function (playerID) {
    const index = this.users.find(obj => obj.id === playerID)
    let newList = []
    if (index === this.users.length - 1) {
        newList = this.users.slice(0, index)
        this.users = newList
    } else if (index === 0) {
        newList = this.users.slice(1)
        this.users = newList
    } else {
        let part1 = this.users.slice(0, index)
        let part2 = this.users.slice(index + 1)
        this.users = part1.concat(part2)
    }
    //need logic here to remove scorecards
    await this.save()
}

gameSchema.methods.getCurrentPlayer = () => {
    return this.currentPlayer.id
}

gameSchema.methods.startGame = () => {
    this.currentPlayer = this.users[0]
    this.started = true
    return this.save()
}

gameSchema.methods.endGame = () => {
    this.started = false
    return this.save()
}

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
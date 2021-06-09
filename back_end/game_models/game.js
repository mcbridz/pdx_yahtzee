const mongoose = require('mongoose')
const ScoreCard = require('./scoreCard')

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
    }
})

gameSchema.statics.newGame = async function (playerList) {
    const game = new this()
    playerList.map(playerID => {
        game.users.push(playerID)
        scoreCard = ScoreCard.create(game._id, 1, playerID)
        game.scoreCards.push(scoreCard.packCard())
    })
    await game.save()
    return game.scoreCards
}

// taskObj = {game: gameID, scoreCard: scoreCardID, tasks: [{task: name, data: data}, {task: name2, data: data2}]}
// data inside taskObj:
// data = {'markOnes', <number of ones dice>, 'markSixes', <number of sixes dice>}

gameSchema.statics.performTasks = async function (taskObj) {
    const scoreCard = await ScoreCard.findOne({ _id: taskObj.scoreCard })
    taskObj.tasks.map((task, data) => {
        scoreCard['mark'+capitalize(task)](data)
    })
}

gameSchema.methods.addPlayer = async function (player) {
    this.users.push(player)
    this.save()
}

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
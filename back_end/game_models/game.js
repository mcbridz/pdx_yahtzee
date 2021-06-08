const mongoose = require('mongoose')
const ScoreCard = require('./scoreCard')

const Schema = mongoose.Schema

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

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
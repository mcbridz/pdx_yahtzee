const mongoose = require('mongoose')
const Game = require('./game')

const Schema = mongoose.Schema

const upperSectionRef = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes']
const lowerSectionRef = ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smStraight', 'lgStraight', 'yahtzee']

const scoreCardSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    gameNum: {
        type: Number,
        required: true
    },
    upperSection: {
        type: Array,
        default: [
            { aces: 0, marked: false, value: 1 },
            { twos: 0, marked: false, value: 2 },
            { threes: 0, marked: false, value: 3 },
            { fours: 0, marked: false, value: 4 },
            { fives: 0, marked: false, value: 5 },
            { sixes: 0, marked: false, value: 6 }
        ],
        required: true
    },
    bonus: {
        type: Number,
        default: 0,
        required: true
    },
    upperSectionTotal: {
        type: Number,
        default: 0,
        required: true
    },
    lowerSection: {
        type: Array,
        default: [
            { threeOfAKind: 0, marked: false },
            { fourOfAKind: 0, marked: false },
            { fullHouse: 0, value: 25, marked: false },
            { smStraight: 0, value: 30, marked: false },
            { lgStraight: 0, value: 40, marked: false },
            { yahtzee: 0, value: 50, marked: false }
        ],
        required: true
    },
    yahtzeeBonus: {
        type: Object,
        default: { score: 0, numYahtzees: 0 },
        required: true
    },
    chance: {
        type: Object,
        default: { score: 0, marked: false}
    },
    lowerSectionTotal: {
        type: Number,
        default: 0,
        required: true
    },
    grandTotal: {
        type: Number,
        default: 0,
        required: true
    }
})

scoreCardSchema.statics.create = async function (gameID, gameNum) {
    const scoreCard = new this()
    scoreCard.game = gameID
    scoreCard.gameNum = gameNum
    await scoreCard.save()
    return this
}

scoreCardSchema.methods.packCard = function () {
    let output = {
        id: this._id,
        gameID: this.game,
        upperSection: [
            { aces: this.upperSection[0].aces, marked: this.upperSection[0].marked },
            { twos: this.upperSection[1].twos, marked: this.upperSection[1].marked },
            { threes: this.upperSection[2].threes, marked: this.upperSection[2].marked },
            { fours: this.upperSection[3].fours, marked: this.upperSection[3].marked },
            { fives: this.upperSection[4].fives, marked: this.upperSection[4].marked },
            { sixes: this.upperSection[5].sixes, marked: this.upperSection[5].marked }
        ],
        bonus: this.bonus,
        upperSectionTotal: this.upperSectionTotal,
        lowerSection: [
            { threeOfAKind: this.lowerSection[0].threeOfAKind, marked: this.lowerSection[0].marked },
            { fourOfAKind: this.lowerSection[1].fourOfAKind, marked: this.lowerSection[1].marked },
            { fullHouse: this.lowerSection[2].fullHouse, marked: this.lowerSection[2].marked },
            { smStraight: this.lowerSection[3].smStraight, marked: this.lowerSection[3].marked },
            { lgStraight: this.lowerSection[4].lgStraight, marked: this.lowerSection[4].marked },
            { yahtzee: this.lowerSection[5].yahtzee, marked: this.lowerSection[5].marked }
        ],
        chance: { score: this.chance.score, marked: this.chance.marked },
        yahtzeeBonus: { score: this.yahtzeeBonus.score, numYahtzees: this.yahtzeeBonus.numYahtzees },
        lowerSectionTotal: this.lowerSectionTotal,
        upperSectionTotal2: this.upperSectionTotal,
        grandTotal: this.grandTotal
    }
    return output
}

const ScoreCard = mongoose.model('ScoreCard', scoreCardSchema)

module.exports = ScoreCard
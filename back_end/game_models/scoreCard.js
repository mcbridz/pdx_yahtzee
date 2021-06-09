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
    player: {
        type: String,
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

scoreCardSchema.statics.create = async function (gameID, gameNum, playerID) {
    const scoreCard = new this()
    scoreCard.game = gameID
    scoreCard.gameNum = gameNum
    scoreCard.player = playerID
    await scoreCard.save()
    return this
}

scoreCardSchema.methods.updateScore = async function() {
    let total = 0
    let upperSectionTotal = 0
    for (let i = 0; i < upperSectionRef.length; i++){
        let subtotal = this.upperSection[i][upperSectionRef[i]] * this.upperSection[i].value
        total += subtotal
        upperSectionTotal += subtotal
    }
    this.upperSectionTotal = subtotal
    let lowerSectionTotal = 0
    for (let i = 0; i < lowerSectionRef.length; i++){
        let subtotal2 = this.lowerSection[i][lowerSectionRef[i]]
        total += subtotal2
        lowerSectionTotal += subtotal2
    }
    this.lowerSectionTotal = subtotal2
    this.grandTotal = total
    this.save()
}

scoreCardSchema.methods.markAces = async function (numAces) {
    if (!this.upperSection[0].marked) {
        let subtotal = this.upperSection[0].value * numAces
        this.upperSection[0].aces = subtotal
        this.upperSection[0].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markTwos = async function (numTwos) {
    if (!this.upperSection[1].marked) {
        let subtotal = this.upperSection[1].value * numTwos
        this.upperSection[1].twos = subtotal
        this.upperSection[1].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markThrees = async function (numThrees) {
    if (!this.upperSection[2].marked) {
        let subtotal = this.upperSection[2].value * numThrees
        this.upperSection[2].threes = subtotal
        this.upperSection[2].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markFours = async function (numFours) {
    if (!this.upperSection[3].marked) {
        let subtotal = this.upperSection[3].value * numFours
        this.upperSection[3].fours = subtotal
        this.upperSection[3].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markFives = async function (numFives) {
    if (!this.upperSection[4].marked) {
        let subtotal = this.upperSection[4].value * numFives
        this.upperSection[4].fives = subtotal
        this.upperSection[4].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markSixes = async function (numSixes) {
    if (!this.upperSection[5].marked) {
        let subtotal = this.upperSection[5].value * numSixes
        this.upperSection[5].sixes = subtotal
        this.upperSection[5].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markFullHouse = async function (pass) {
    if (!this.lowerSection[2].marked) {
        this.lowerSection[2].fullHouse = this.lowerSection[2].value
        this.lowerSection[2].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markSmStraight = async function (pass) {
    if (!this.lowerSection[3].marked) {
        this.lowerSection[3].smStraight = this.lowerSection[3].value
        this.lowerSection[3].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markLgStraight = async function (pass) {
    if (!this.lowerSection[4].marked) {
        this.lowerSection[4].lgStraight = this.lowerSection[4].value
        this.lowerSection[4].marked = true
        await this.save()
        this.updateScore()
    }
}

scoreCardSchema.methods.markYahtzee = async function (pass) {
    if (this.lowerSection[5].marked) {
        let newBonus = this.yahtzeeBonus.score + 100
        let newNumYahtzees = this.yahtzeeBonus.numYahtzees + 1
        this.yahtzeeBonus.score = newBonus
        this.yahtzeeBonus.numYahtzees = newNumYahtzees
    } else {
        this.lowerSection[5].yahtzee = this.lowerSection[5].value
        this.lowerSection[5].marked = true
    }
    await this.save()
    this.updateScore()
}

scoreCardSchema.methods.packCard = function () {
    let output = {
        id: this._id,
        gameID: this.game,
        player: this.player,
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
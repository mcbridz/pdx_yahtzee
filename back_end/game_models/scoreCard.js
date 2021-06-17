const mongoose = require('mongoose')
const Game = require('./game')
const Message = require('../chatroom/chatModels').Message

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
        default: { score: 0, marked: false }
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
    // console.log('////////////////////score card creation function//////////////')
    // console.log(scoreCard)
    return scoreCard.save()
}

scoreCardSchema.methods.updateScore = function () {
    let upperSectionTotal = 0
    for (let i = 0; i < upperSectionRef.length; i++) {
        let subtotal = this.upperSection[i][upperSectionRef[i]]
        upperSectionTotal += subtotal
    }
    this.upperSectionTotal = upperSectionTotal
    let lowerSectionTotal = 0
    for (let i = 0; i < lowerSectionRef.length; i++) {
        let subtotal = this.lowerSection[i][lowerSectionRef[i]]
        lowerSectionTotal += subtotal
    }
    this.lowerSectionTotal = lowerSectionTotal
    // console.log('////////////////////////////////')
    // console.log('Upper Section Total = ' + upperSectionTotal.toString())
    // console.log('Lower Section Total = ' + lowerSectionTotal.toString())
    // console.log('Bonus = ' + this.bonus.toString())
    // console.log('Yahtzee Bonus = ' + this.yahtzeeBonus.score.toString())
    // console.log('Chance = ' + this.chance.score.toString())
    this.grandTotal = upperSectionTotal +
        lowerSectionTotal +
        parseInt(this.bonus) +
        parseInt(this.yahtzeeBonus.score) +
        parseInt(this.chance.score)

    return this.save()
}

const systemMessageBuilder = async function (text, room) {
    const message = new Message()
    message.text = text
    message.room = room
    message.private = true
    message.username = "SYSTEM"
    await message.save()
    return message
}

scoreCardSchema.methods.markAces = async function (numAces, taskObj, room) {
    console.log('IN SCORECARD')
    // console.log(this.upperSection)
    if (!this.upperSection[0].marked) {
        let subtotal = this.upperSection[0].value * numAces
        this.upperSection[0].aces = subtotal
        this.upperSection[0].marked = true
        const newMessage = systemMessageBuilder(`${subtotal} marked in Aces`, room)
        taskObj.ioEmit(newMessage)
        // console.log('LEAVING SCOREBOARD')
        this.markModified('upperSection')
        return this.updateScore()
    }
    // console.log('SAVING BETTER THAN I THOUGHT')
}

scoreCardSchema.methods.markTwos = async function (numTwos, taskObj, room) {
    if (!this.upperSection[1].marked) {
        console.log(`${this.upperSection[1].value} * ${numTwos} = ${this.upperSection[1].value * numTwos}`)
        let subtotal = this.upperSection[1].value * numTwos
        this.upperSection[1].twos = subtotal
        this.upperSection[1].marked = true
        const newMessage = systemMessageBuilder(`${subtotal} marked in Twos`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('upperSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markThrees = async function (numThrees, taskObj, room) {
    if (!this.upperSection[2].marked) {
        let subtotal = this.upperSection[2].value * numThrees
        this.upperSection[2].threes = subtotal
        this.upperSection[2].marked = true
        const newMessage = systemMessageBuilder(`${subtotal} marked in Threes`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('upperSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markFours = async function (numFours, taskObj, room) {
    if (!this.upperSection[3].marked) {
        let subtotal = this.upperSection[3].value * numFours
        this.upperSection[3].fours = subtotal
        this.upperSection[3].marked = true
        const newMessage = systemMessageBuilder(`${subtotal} marked in Fours`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('upperSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markFives = async function (numFives, taskObj, room) {
    if (!this.upperSection[4].marked) {
        let subtotal = this.upperSection[4].value * numFives
        this.upperSection[4].fives = subtotal
        this.upperSection[4].marked = true
        const newMessage = systemMessageBuilder(`${subtotal} marked in Fives`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('upperSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markSixes = function (numSixes, taskObj, room) {
    console.log('ENTERING SCORECARD')
    if (!this.upperSection[5].marked) {
        let subtotal = this.upperSection[5].value * numSixes
        // console.log(subtotal)
        this.upperSection[5].sixes = subtotal
        this.upperSection[5].marked = true
        const newMessage = systemMessageBuilder(`${subtotal} marked in Sixes`, room)
        taskObj.ioEmit(newMessage)
        // console.log(this)
        // console.log('LEAVING SCOREBOARD')
        this.markModified('upperSection')
        return this.updateScore()
    }
    // console.log('SAVING BETTER THAN EXPECTED')
}

scoreCardSchema.methods.markThreeOfAKind = function (data, taskObj, room) {
    if (!this.lowerSection[0].marked) {
        this.lowerSection[0].threeOfAKind = data
        this.lowerSection[0].marked = true
        const newMessage = systemMessageBuilder(`Three of a kind marked`, room)
        taskObj.ioEmit(newMessage)
        return this.updateScore()
    }
}

scoreCardSchema.methods.markFourOfAKind = function (data, taskObj, room) {
    if (!this.lowerSection[1].marked) {
        this.lowerSection[1].fourOfAKind = data
        this.lowerSection[1].marked = true
        const newMessage = systemMessageBuilder(`Four of a kind marked`, room)
        taskObj.ioEmit(newMessage)
        return this.updateScore()
    }
}

scoreCardSchema.methods.markFullHouse = async function (pass, taskObj, room) {
    if (!this.lowerSection[2].marked) {
        this.lowerSection[2].fullHouse = this.lowerSection[2].value
        this.lowerSection[2].marked = true
        const newMessage = systemMessageBuilder(`Full House marked`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('lowerSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markSmStraight = async function (pass, taskObj, room) {
    if (!this.lowerSection[3].marked) {
        this.lowerSection[3].smStraight = this.lowerSection[3].value
        this.lowerSection[3].marked = true
        const newMessage = systemMessageBuilder(`Small straight marked`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('lowerSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markLgStraight = async function (pass, taskObj, room) {
    if (!this.lowerSection[4].marked) {
        this.lowerSection[4].lgStraight = this.lowerSection[4].value
        this.lowerSection[4].marked = true
        const newMessage = systemMessageBuilder(`Large straight marked`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('lowerSection')
        return this.updateScore()
    }
}

scoreCardSchema.methods.markYahtzee = async function (pass, taskObj, room) {
    if (this.lowerSection[5].marked) {
        let newBonus = this.yahtzeeBonus.score + 100
        let newNumYahtzees = this.yahtzeeBonus.numYahtzees + 1
        this.yahtzeeBonus.score = newBonus
        this.yahtzeeBonus.numYahtzees = newNumYahtzees
        const newMessage = systemMessageBuilder(`${numYahtzees} Bonus Yahtzees for a total of ${newBonus}`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('yahtzeeBonus')
    } else {
        this.lowerSection[5].yahtzee = this.lowerSection[5].value
        this.lowerSection[5].marked = true
        const newMessage = systemMessageBuilder(`First Yahtzee marked`, room)
        taskObj.ioEmit(newMessage)
        this.markModified('lowerSection')
    }
    return this.updateScore()
}

scoreCardSchema.methods.markChance = async function (data, taskObj, room) {
    if (!this.chance.marked) {
        this.chance.score = data
        this.chance.marked = true
        const newMessage = systemMessageBuilder(`${data} marked in Chance`, room)
        taskObj.ioEmit(newMessage)
        return this.updateScore()
    }
}

scoreCardSchema.methods.packCard = function () {
    let output = {
        id: this._id,
        gameID: this.game,
        gameNum: this.gameNum,
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
            { yahtzee: this.lowerSection[5].yahtzee, marked: this.lowerSection[5].marked },
            { score: this.chance.score, marked: this.chance.marked }
        ],
        yahtzeeBonus: { score: this.yahtzeeBonus.score, numYahtzees: this.yahtzeeBonus.numYahtzees },
        lowerSectionTotal: this.lowerSectionTotal,
        upperSectionTotal2: this.upperSectionTotal,
        grandTotal: this.grandTotal
    }
    return output
}

const ScoreCard = mongoose.model('ScoreCard', scoreCardSchema)

module.exports = ScoreCard
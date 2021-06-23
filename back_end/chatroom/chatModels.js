const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../protected_routes/userModel')
const key = process.env.KEY || require("../../secrets").key;
const Schema = mongoose.Schema

// Chatroom schema, methods and statics
const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true,
        default: false
    }
})

messageSchema.statics.newMessage = async function (messageData) {
    const token = messageData['token']
    const payload = jwt.decode(token, key)
    const user = await User.findOne({ _id: payload._id })
    if (jwt.verify(token, key) && user) {
        const message = new this()
        message.text = messageData['text']
        message.room = messageData['room']
        message.username = messageData['username']
        message.private = messageData['private']
        await message.save()
        return message
    }
    return null
}

messageSchema.statics.getMessages = function (filter) {
    console.log(filter)
    return this.find(filter)
}

messageSchema.statics.systemMessage = async function (text, room) {
    const message = new this()
    message.username = 'SYSTEM'
    message.private = true
    message.text = text
    message.room = room
    await message.save()
    return message
}

const Message = mongoose.model('Message', messageSchema)

// Room schema, methods and statics

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    private: {
        type: Boolean,
        required: true,
        default: false
    }
})

roomSchema.statics.newRoom = async function (roomObj) {
    const room = new this()
    room.name = roomObj.name
    room.private = roomObj.private
    return room.save()
}

roomSchema.statics.getRooms = async function (filter) {
    const rooms = await this.find((!filter) ? {} : filter)
    return rooms
}
const Room = mongoose.model('Room', roomSchema)

module.exports = { Room, Message }
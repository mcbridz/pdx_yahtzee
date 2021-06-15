const mongoose = require('mongoose')
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
    return this.find((!filter) ? { private: false } : filter)
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
    await room.save()
    return room
}

roomSchema.statics.getRooms = async function (filter) {
    const rooms = await this.find((!filter) ? {} : filter)
    return rooms
}
const Room = mongoose.model('Room', roomSchema)

module.exports = { Room, Message }
const express = require('express')
const jwt = require('jsonwebtoken')
const key = process.env.KEY || require('../../secrets').key

const router = express.Router()

const User = require('../protected_routes/userModel')

router.post('/login', (req, res) => {
    console.log(`Looking for user ${req.body.username}`)
    User.findOne({ username: req.body.username }, async (err, user) => {
        console.log(`Found user: ${user.username}`)
        if (err) return res.status(500).send(err)
        if (!user) return res.status(400).send('Invalid login ingo')
        console.log(`User is valid`)
        const matchingPassword = await user.comparePassword(req.body.password)
        console.log(`password verified as : ${matchingPassword}`)
        if (!matchingPassword) return res.status(400).send('Invalid login ingo')
        console.log(`Signing token with key: ${key}`)
        jwt.sign({ _id: user._id }, key, (err, token) => {
            let port = !process.env.PORT ? 8000 : process.env.PORT
            if (err) return res.status(500).send(err)
            console.log('SENDING TOKEN: ' + token)
            res.status(200).send({ token })
        })
    })
    // res.status(300).send(req.body)
})

module.exports = router
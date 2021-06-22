const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersRegister = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('UsersRegister', UsersRegister)
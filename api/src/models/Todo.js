const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
},{timestamps: true})


const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
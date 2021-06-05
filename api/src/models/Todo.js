const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})
todoSchema.index({name: 1, userId: 1}, { unique: true });

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
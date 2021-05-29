const mongoose = require('mongoose')
const Schema = mongoose.Schema
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')
import Email from '../models/Email';

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: Email,
        //required: true
    }
})

userSchema.plugin(aggregatePaginate)

const User = mongoose.model('User', userSchema)

module.exports = User
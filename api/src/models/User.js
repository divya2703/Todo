const mongoose = require('mongoose')
const Schema = mongoose.Schema
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')


const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

userSchema.plugin(aggregatePaginate)

const User = mongoose.model('User', userSchema)

module.exports = User
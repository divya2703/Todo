const mongoose = require('mongoose')
const Schema = mongoose.Schema
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const pageSchema = Schema({
    segment: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    pd: {
        type: Schema.Types.Mixed
    }
})

pageSchema.plugin(aggregatePaginate)

const Page = mongoose.model('Page', pageSchema)

module.exports = Page
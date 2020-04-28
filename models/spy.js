var mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
    data: [Number]
})

module.exports = mongoose.model('SPY', schema)

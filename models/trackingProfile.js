var mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
    profileName: String
})

module.exports = mongoose.model('TrackingProfile', schema)

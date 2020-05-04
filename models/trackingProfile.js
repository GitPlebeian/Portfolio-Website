var mongoose = require('mongoose')

const Schema = mongoose.Schema

const TradeOrder = new Schema({
    shares: Number,
    price: Number,
    date: String,
    newEquity: Number
})

const Trade = new Schema({
    symbol: String,
    buyOrders: [TradeOrder],
    sellOrders: [TradeOrder],
    open: Boolean,
    optimism: Number
})

const Profile = new Schema({
    profileName: String,
    trades: [Trade],
    dateCreated: Date
})

module.exports = mongoose.model('TrackingProfile', Profile)

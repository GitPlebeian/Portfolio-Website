const fs = require('fs')
const ejs = require('ejs')

module.exports = {
    // Homepage
    getspydata: function(req, res, next) {
        res.json({
            status: "tacos"
        })
    }
}

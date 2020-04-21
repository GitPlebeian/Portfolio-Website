const fs = require('fs')
const ejs = require('ejs')

module.exports = {
    // Homepage
    homepage: function(req, res, next) {
        res.render('homepage.ejs')
    }
}

SPYModel = require('../models/spy')

module.exports = {
    // Homepage
    homepage: function(req, res, next) {
        res.render('homepage.ejs')
    },
    financial: function(req, res, next) {
        res.render('financial.ejs')
    }
}

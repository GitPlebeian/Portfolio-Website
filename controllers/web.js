SPYModel = require('../models/spy')
TrackingProfile = require('../models/trackingProfile')

module.exports = {
    homepage: function(req, res, next) {
        res.render('homepage.ejs')
    },
    financial: function(req, res, next) {
        TrackingProfile.find({}, function(err, trackingProfiles) {
            if (err) {
                res.send(err)
            } else {
                res.render('financial.ejs', {
                    profiles: trackingProfiles
                })
            }
        })
    }
}

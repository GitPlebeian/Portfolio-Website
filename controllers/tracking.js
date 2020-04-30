const TrackingProfile = require('../models/trackingProfile')

module.exports = {
    createProfile: function(req, res, next) {
        profileName = req.body.profileName
        if (!profileName) {
            res.send("Invalid Profile Name")
            return
        }

        TrackingProfile.create({
            profileName: profileName
        }, function(err, profileName) {
            if (err) {
                res.send("Error while creating new model")
                return
            }
            res.redirect("/financial")
        })
    }
}

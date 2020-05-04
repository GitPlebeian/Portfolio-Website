const TrackingProfile = require('../models/trackingProfile')

module.exports = {
    createProfile: function(req, res, next) {
        profileName = req.body.profileName
        if (!profileName) {
            res.send("Invalid Profile Name")
            return
        }

        TrackingProfile.create({
            profileName: profileName,
            dateCreated: Date()
        }, function(err) {
            if (err) {
                res.send("Error while creating new model")
                return
            }
            res.redirect("/financial")
        })
    },
    renameProfile: function(req, res, next) {
        originalProfileName = req.body.originalProfileName
        newProfileName = req.body.newProfileName
        if (!newProfileName || !originalProfileName) {
            res.send("Fields Not Provided")
            return
        }

        TrackingProfile.findOne({
            profileName: originalProfileName
        }, function(err, profile) {
            if (err) {
                res.send(err)
            } else if (profile) {
                profile.profileName = newProfileName
                profile.save(function(err) {
                    if (err) {
                        res.send(err)
                    }
                    res.redirect("/financial")
                })
            } else {
                res.send("Unable to find existing profile with name: " + originalProfileName)
            }
        })
    },
    deleteProfile: function(req, res, next) {
        profileName = req.body.profileName
        if (!profileName) {
            res.send("Fields not provided")
            return
        }

        TrackingProfile.deleteOne({
            profileName: profileName
        }, function(err) {
            if (err) {
                res.send(err)
                return
            }
            res.redirect("/financial")
        })
    },
    viewProfile: function(req, res, next) {
        profileName = req.query.profileName
        if (!profileName) {
            res.send("Profile Name Not Provided")
            return
        }
        TrackingProfile.findOne({
            profileName: profileName
        }, function(err, profile) {
            if (err) {
                res.send(err)
                return
            } else if (profile) {
                res.render("trackingProfile", {
                    profile: profile
                })
            } else {
                res.send("No profile found")
            }
        })
    },
    createTrade: function(req, res, next) {
        profileName = req.body.profileName
        symbol = req.body.symbol
        numberOfSharesPurchased = req.body.numberOfSharesPurchased
        averageSharePrice = req.body.averageSharePrice
        optimism = req.body.optimism
        date = req.body.date
        if (!profileName || !symbol || !numberOfSharesPurchased || !averageSharePrice || !optimism || !date) {
            res.send("Fields not provided")
            return
        }
        if (!Number(numberOfSharesPurchased) || !Number(averageSharePrice) || !Number(optimism)) {
            res.send("Send a number not a string please.")
            return
        }
        TrackingProfile.findOne({
            profileName: profileName
        }, function(err, profile) {
            if (err) {
                res.send(err)
            } else if (profile) {
                profile.trades.push({
                    symbol: symbol,
                    buyOrders: [{
                        shares: numberOfSharesPurchased,
                        price: averageSharePrice,
                        date: date
                    }],
                    sellOrders: [],
                    open: true,
                    optimism: optimism
                })
                profile.save(function(err) {
                    if (err) {
                        res.send(err)
                        return
                    }
                    res.redirect('/financial/viewProfile?profileName=' + profileName)
                })
            } else {
                res.send("No profile found for profileName: " + profileName)
            }
        })
    }
}

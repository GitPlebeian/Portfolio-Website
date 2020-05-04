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
    },
    viewTrade: function(req, res, next) {
        let profileName = req.query.profileName
        let tradeID = req.query.tradeID
        if (!profileName || !tradeID) {
            res.send("Fields Not Provided")
            return
        }

        TrackingProfile.findOne({
            profileName: profileName
        }, function(err, profile) {
            if (err) {
                res.send(err)
            } else if (profile) {
                tradeIndex = -1
                for (i = 0;i < profile.trades.length;i++) {
                    if (profile.trades[i]._id == tradeID) {
                        tradeIndex = i
                        break
                    }
                }
                if (tradeIndex == -1) {
                    res.send("Trade Not Found for trade ID: " + tradeID)
                    return
                }
                res.render('viewTrade', {
                    trade: profile.trades[tradeIndex],
                    profileName: profile.profileName
                })
            } else {
                res.send("Profile not found for profileName: " + profileName)
            }
        })
    },
    addBuyOrder: function(req, res, next) {
        let profileName = req.query.profileName
        let tradeID = req.query.tradeID
        let numberOfSharesPurchased = req.body.numberOfSharesPurchased
        let averageSharePrice = req.body.averageSharePrice
        let date = req.body.date
        if (!profileName || !tradeID || !date || !Number(numberOfSharesPurchased) || !Number(averageSharePrice)) {
            res.send("Fields Not Provided")
            return
        }
        TrackingProfile.findOne({
            profileName: profileName
        }, function(err, profile) {
            if (err) {
                res.send(err)
            } else if (profile) {
                tradeIndex = -1
                for (i = 0;i < profile.trades.length;i++) {
                    if (profile.trades[i]._id == tradeID) {
                        tradeIndex = i
                        break
                    }
                }
                if (tradeIndex == -1) {
                    res.send("Trade Not Found for trade ID: " + tradeID)
                    return
                }
                profile.trades[tradeIndex].buyOrders.push({
                    shares: numberOfSharesPurchased,
                    price: averageSharePrice,
                    date: date
                })
                profile.save(function(err) {
                    if (err) {
                        res.send(err)
                        return
                    }
                    res.redirect('/financial/viewTrade?profileName=' + profile.profileName + "&tradeID=" + profile.trades[tradeIndex]._id)
                })
            } else {
                res.send("Profile not found for profileName: " + profileName)
            }
        })
    },
    addSellOrder: function(req, res, next) {
        let profileName = req.query.profileName
        let tradeID = req.query.tradeID
        let numberOfSharesSold = req.body.numberOfSharesPurchased
        let averageSharePrice = req.body.averageSharePrice
        let date = req.body.date
        if (!profileName || !tradeID || !date || !Number(numberOfSharesPurchased) || !Number(averageSharePrice)) {
            res.send("Fields Not Provided")
            return
        }
        TrackingProfile.findOne({
            profileName: profileName
        }, function(err, profile) {
            if (err) {
                res.send(err)
            } else if (profile) {
                tradeIndex = -1
                for (i = 0;i < profile.trades.length;i++) {
                    if (profile.trades[i]._id == tradeID) {
                        tradeIndex = i
                        break
                    }
                }
                if (tradeIndex == -1) {
                    res.send("Trade Not Found for trade ID: " + tradeID)
                    return
                }
                profile.trades[tradeIndex].buyOrders.push({
                    shares: numberOfSharesPurchased,
                    price: averageSharePrice,
                    date: date
                })
                profile.save(function(err) {
                    if (err) {
                        res.send(err)
                        return
                    }
                    res.redirect('/financial/viewTrade?profileName=' + profile.profileName + "&tradeID=" + profile.trades[tradeIndex]._id)
                })
            } else {
                res.send("Profile not found for profileName: " + profileName)
            }
        })
    }
}

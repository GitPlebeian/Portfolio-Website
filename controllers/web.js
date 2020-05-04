SPYModel = require('../models/spy')
TrackingProfile = require('../models/trackingProfile')
DateFormat = require('date-format')

module.exports = {
    homepage: function(req, res, next) {
        res.render('homepage.ejs')
    },
    financial: function(req, res, next) {
        TrackingProfile.find({}, function(err, trackingProfiles) {
            if (err) {
                res.send(err)
            } else {
                var openTrades = []
                var closedTrades = []
                var datesCreated = []
                for (trackingProfileIndex = 0;trackingProfileIndex < trackingProfiles.length;trackingProfileIndex++) {
                    var opemTradesForProfile = 0
                    var closedTradesForProfile = 0
                    for (tradeIndex = 0;tradeIndex < trackingProfiles[trackingProfileIndex].trades.length;tradeIndex++) {
                        if (trackingProfiles[trackingProfileIndex].trades[tradeIndex].open == true) {
                            opemTradesForProfile++
                        } else {
                            closedTradesForProfile++
                        }
                    }
                    openTrades.push(opemTradesForProfile)
                    closedTrades.push(closedTradesForProfile)
                    datesCreated.push(DateFormat.asString('MM-dd-yyyy', trackingProfiles[trackingProfileIndex].dateCreated))
                }
                res.render('financial.ejs', {
                    profiles: trackingProfiles,
                    openTrades: openTrades,
                    closedTrades: closedTrades,
                    datesCreated: datesCreated
                })
            }
        })
    }
}

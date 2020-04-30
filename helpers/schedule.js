var schedule = require('node-schedule')
var dateFormat = require('date-format')
var request = require("request")
var polygonAPIKey = require("../polygonAPIKey")

var getSPYDataDebug = require("debug")("Get-SPY-Data")

function getTodaysDatePlusOne() {
    var date = new Date()
    date.setDate(date.getDate() + 1)
    var string = dateFormat.asString('yyyy-MM-dd', date)
    return date
}

function dateMinusOneDay(date) {
    date.setDate(date.getDate() - 1)
    return date
}

module.exports = {
    scheduleTasks: function() {
        schedule.scheduleJob('*/3 * * * * *', function() {
            request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SPY&outputsize=compact&apikey=' + polygonAPIKey.apiKey, function(error, response, body) {
                var parsedData = JSON.parse(body)["Time Series (Daily)"]
                var stockDataArray = []
                var daysWithoutData = 0
                var date = getTodaysDatePlusOne()
                while (daysWithoutData == 10) {
                    date = parsedData[dateMinusOneDay(date).dateAsString]
                    var string = dateFormat.asString('yyyy-MM-dd', date)
                    if (date) {
                        stockDataArray.push(date)
                    } else {
                        daysWithoutData += 1
                    }
                }
                getSPYDataDebug("%O", stockDataArray)
            })
        })
    }
}

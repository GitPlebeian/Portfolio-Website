var schedule = require('node-schedule')
var request = require("request")
var polygonAPIKey = require("../polygonAPIKey")

function getTodaysDate() {

}

module.exports = {
    scheduleTasks: function() {
        schedule.scheduleJob('*/10 * * * * *', function() {
            console.log("Scheduling job")

            console.log(getTodaysDate())

            request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=NVR&outputsize=compact&apikey=' + polygonAPIKey.apiKey, function(error, response, body) {
                console.log("Data: %O", JSON.parse(body)["Time Series (Daily)"])
            })
        })
    }
}

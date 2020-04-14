var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app)
var publicRoutes = require('./routes/web')
process.on('uncaughtException', function (err) {
  console.error(err)
  process.exit(1)
})
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(express.static('public'))
app.use('/', publicRoutes)
server.listen(80, function() {
	console.log("Starting Server")
})

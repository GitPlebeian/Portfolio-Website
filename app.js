var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app)
var webRoutes = require('./routes/web')

process.on('uncaughtException', function (err) {
  console.error(err)
  process.exit(1)
})

app.use(bodyParser.urlencoded({
	extended: true
}))

app.set('views', 'public/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/', webRoutes)
server.listen(80, function() {
	console.log("Starting Server")
})

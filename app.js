var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app)
var webRoutes = require('./routes/web')
var dataRoutes = require('./routes/data')
var scheduler = require('./helpers/schedule')

process.on('uncaughtException', function (err) {
  console.error(err)
  process.exit(1)
})

var databaseName = 'Personal-Site'
mongoose.connect('mongodb://localhost/' + databaseName, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to database: ' + databaseName)
})

app.use(bodyParser.urlencoded({
	extended: true
}))

app.set('views', 'public/views/pages')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/', webRoutes)
app.use('/data', dataRoutes)
scheduler.scheduleTasks()
server.listen(80, function() {
	console.log("Starting Server")
})

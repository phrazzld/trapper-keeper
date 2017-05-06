// BASE SETUP
// ==================================================================================
var express = require('express')            // get our middleware
var app = express()                         // initialize our express app
var bodyParser = require('body-parser')     // parse data from POSTs
var logger = require('morgan')              // log requests and responses
var passport = require('passport')          // user authentication
var mongoose = require('mongoose')          // db orm
var dbconfig = require('./config/database')

// use bodyParser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// set our port
var port = process.env.PORT || 8080

mongoose.connect(dbconfig.database)

// apply passport to our app
app.use(passport.initialize())
require('./config/passport')(passport)

// API ROUTES
// ==================================================================================
var router = express.Router()

// define our middleware
router.use(function (req, res, next) {
    // logging
  console.log('something is happening')
    // authorization
  next()
})

// pull our routes
var routes = require('./app/routes')(router)
// register routes with /api prefix
app.use('/api', router)

// start the server
app.listen(port)
console.log('port ' + port + ' goes "whirrrr..."')

// basic middleware for all Express requests
// log requests to api with morgan
app.use(logger('dev'))

// enable CORS from client-side
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

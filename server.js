// BASE SETUP
// ==================================================================================

// grab necessary packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// use bodyParser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;

// use mongoose as our db orm
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trapperkeeper');

// API ROUTES
// ==================================================================================
var router = express.Router();

// define our middleware
router.use(function(req, res, next) {
    // logging
    console.log('something is happening');
    // authorization
    next();
});

// pull our routes
var routes = require('./app/routes')(router);
// register routes with /api prefix
app.use('/api', router);

// start the server
app.listen(port);
console.log('port ' + port + ' goes "whirrrr..."');

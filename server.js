// BASE SETUP
// ==================================================================================

var express = require('express');                   // middleware
var bodyParser = require('body-parser');            // parse data from POSTs
var app = express();

// use bodyParser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');                 // db orm
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

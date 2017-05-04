var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name        : String,
    url         : String,
    description : String,
    consumed    : Boolean
});

module.exports = mongoose.model('Resource', ResourceSchema);

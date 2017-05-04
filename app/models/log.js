var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    text        : String,
    entryTime   : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);

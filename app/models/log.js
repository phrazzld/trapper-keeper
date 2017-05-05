var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    text            : {
        type        : String,
        required    : true
    },
    entryTime       : {
        type        : Date,
        required    : true,
        default     : Date.now
    }
}, {
    timestamps      : true
});

module.exports = mongoose.model('Log', LogSchema);

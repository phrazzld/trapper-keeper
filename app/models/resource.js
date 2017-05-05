var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name            : {
        type        : String,
        required    : true
    },
    url             : { type: String },
    description     : { type: String },
    consumed        : {
        type        : Boolean,
        default     : false
    }
}, {
    timestamps      : true
});

module.exports = mongoose.model('Resource', ResourceSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name            : {
        type        : String,
        required    : true
    },
    goal            : {
        type        : String,
        required    : true
    },
    description     : { type: String }
}, {
    timestamps      : true
});

module.exports = mongoose.model('Project', ProjectSchema);


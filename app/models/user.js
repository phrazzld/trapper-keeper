var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email                   : {
        type                : String,
        lowercase           : true,
        unique              : true,
        required            : true
    },
    password                : {
        type                : String,
        required            : true
    }
}, {
    timestamps              : true
});

module.exports = mongoose.model('User', UserSchema);

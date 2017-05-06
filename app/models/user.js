var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', function (next) {
  var user = this
  var SALT_FACTOR = 10

  if (user.isModified('password') || user.isNew) {
    // user changed their password, or is a new user
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) { return next(err) }

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) { return next(err) }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) { return cb(err) }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)

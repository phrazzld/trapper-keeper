var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var User = require('../app/models/user')
var dbconfig = require('../config/database')

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = dbconfig.secret
  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.findOne({ id: jwtPayload.id }, function (err, user) {
      if (err) { return done(err, false) }
      if (user) { done(null, user) } else { done(null, false) }
    })
  }))
}

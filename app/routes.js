var Log = require('./models/log')
var Resource = require('./models/resource')
var Project = require('./models/project')
var User = require('./models/user')
var passport = require('passport')
var jwt = require('jwt-simple')
var dbconfig = require('../config/database')

module.exports = function (router) {
    // test route
    // GET /api
  router.get('/', function (req, res) {
    res.json({ message: 'whirrrrr... api operational...' })
  })

    // ##############################################################################
    // LOGS #########################################################################
    // ##############################################################################
  router.route('/logs')
    // create a log
    // POST /api/logs
        .post(function (req, res) {
          var log = new Log()
          log.text = req.body.text

          log.save(function (err) {
            if (err) { res.send(err) }
            res.json({ message: 'Logged' })
          })
        })
    // get all the logs
    // GET /api/logs
        .get(function (req, res) {
          Log.find(function (err, logs) {
            if (err) { res.send(err) }
            res.json(logs)
          })
        })

    // -----------------------------------------------------------------------------
  router.route('/logs/:log_id')
    // get a log
    // GET /api/logs/:log_id
        .get(function (req, res) {
          Log.findById(req.params.log_id, function (err, log) {
            if (err) { res.send(err) }
            res.json(log)
          })
        })
    // update a log
    // PUT /api/logs/:log_id
        .put(function (req, res) {
          Log.findById(req.params.log_id, function (err, log) {
            if (err) { res.send(err) }

                // overwrite log data with data from request
            log.text = req.body.text

                // save the log
            log.save(function (err) {
              if (err) { res.send(err) }
              res.json({ message: 'Log updated' })
            })
          })
        })
    // delete a log
    // DELETE /api/logs/:log_id
        .delete(function (req, res) {
          Log.remove({
            _id: req.params.log_id
          }, function (err, log) {
            if (err) { res.send(err) }
            res.json({ message: 'Log deleted' })
          })
        })

    // #############################################################################
    // RESOURCES ###################################################################
    // #############################################################################
  router.route('/resources')
    // create a resource
    // POST /api/resources
        .post(function (req, res) {
          var resource = new Resource()
            // set properties from request body
          resource.name = req.body.name
          resource.url = req.body.url
          resource.description = req.body.description
            // save resource
          resource.save(function (err) {
            if (err) { res.send(err) }
            res.json({ message: 'Resource saved' })
          })
        })
    // get all the resources
    // GET /api/resources
        .get(function (req, res) {
          Resource.find(function (err, resources) {
            if (err) { res.send(err) }
            res.json(resources)
          })
        })

    // -----------------------------------------------------------------------------
  router.route('/resources/:resource_id')
    // get a resource
    // GET /api/resources/:resource_id
        .get(function (req, res) {
          Resource.findById(req.params.resource_id, function (err, resource) {
            if (err) { res.send(err) }
            res.json(resource)
          })
        })
    // update a resource
    // PUT /api/resources/:resource_id
        .put(function (req, res) {
          Resource.findById(req.params.resource_id, function (err, resource) {
            if (err) { res.send(err) }
                // do the updating
            resource.name = req.body.name
            resource.url = req.body.url
            resource.description = req.body.description
            resource.consumed = req.body.consumed
                // save the updates
            resource.save(function (err) {
              if (err) { res.send(err) }
              res.json({ message: 'Resource updated' })
            })
          })
        })
    // delete a resource
    // DELETE /api/resources/:resource_id
        .delete(function (req, res) {
          Resource.remove({
            _id: req.params.resource_id
          }, function (err, resource) {
            if (err) { res.send(err) }
            res.json({ message: 'Resource deleted' })
          })
        })

    // #############################################################################
    // PROJECTS ####################################################################
    // #############################################################################
  router.route('/projects')
    // create a project
    // POST /api/projects
        .post(function (req, res) {
          var project = new Project()
            // set properties from request body
          project.name = req.body.name
          project.description = req.body.description
          project.goal = req.body.goal
            // save project
          project.save(function (err, project) {
            if (err) { res.send(err) }
            res.json({ message: 'Project created' })
          })
        })
    // get all projects
    // GET /api/projects
        .get(function (req, res) {
          Project.find(function (err, project) {
            if (err) { res.send(err) }
            res.json(project)
          })
        })

    // ------------------------------------------------------------------------------
  router.route('/projects/:project_id')
    // get a project
    // GET /api/projects/:project_id
        .get(function (req, res) {
          Project.findById(req.params.project_id, function (err, project) {
            if (err) { res.send(err) }
            res.send(project)
          })
        })
    // update a project
    // PUT /api/projects/:project_id
        .put(function (req, res) {
          Project.findById(req.params.project_id, function (err, project) {
            if (err) { res.send(err) }
                // do updates
            project.name = req.body.name
            project.description = req.body.description
            project.goal = req.body.goal
                // save project
            project.save(function (err) {
              if (err) { res.send(err) }
              res.json({ message: 'Project updated.' })
            })
          })
        })
    // delete a project
    // DELETE /api/projects/:project_id
        .delete(function (req, res) {
          Project.remove({
            _id: req.params.project_id
          }, function (err, project) {
            if (err) { res.send(err) }
            res.json({ message: 'Project deleted.' })
          })
        })

    // ##############################################################################
    // USERS ########################################################################
    // #############################################################################
  router.route('/signup')
    // create a new user account
    // POST /api/signup
        .post(function (req, res) {
          if (!req.body.email || !req.body.password) {
            res.json({ success: false, message: 'Email and password are required.' })
          } else {
            var newUser = new User({
              email: req.body.email,
              password: req.body.password
            })
            newUser.save(function (err) {
              if (err) { return res.json({ success: false, message: 'Email taken.' }) }
              res.json({ success: true, message: 'New user created.' })
            })
          }
        })

  router.route('/users')
    // create a user
    // POST /api/users
        .post(function (req, res) {
          var user = new User()
            // save values from POST request to new user object
          user.email = req.body.email
          user.password = req.body.password
            // save the new user
          user.save(function (err) {
            if (err) { res.send(err) }
            res.json({ message: 'User created.' })
          })
        })
    // get all users
    // GET /api/users
        .get(function (req, res) {
          User.find(function (err, users) {
            if (err) { res.send(err) }
            res.json(users)
          })
        })

    // ------------------------------------------------------------------------------
  router.route('/users/:user_id')
    // get a user
    // GET /api/users/:user_id
        .get(passport.authenticate('jwt', { session: false }), function (req, res) {
          var token = getToken(req.headers)
          if (token) {
            User.findById(req.params.user_id, function (err, user) {
              if (err) { res.send(err) }
              if (!user) {
                return res.status(403).send({
                  success: false,
                  message: 'Authentication failed. No user found with that id.'
                })
              }
              res.json({
                success: true,
                data: user
              })
            })
          } else {
            return res.status(403).send({
              success: false,
              message: 'No token provided.'
            })
          }
        })
    // update a user
    // PUT /api/users/:user_id
        .put(function (req, res) {
          User.findById(req.params.user_id, function (err, user) {
            if (err) { res.send(err) }
            user.email = req.body.email
            user.password = req.body.password
            user.save(function (err) {
              if (err) { res.send(err) }
              res.json({ message: 'User updated.' })
            })
          })
        })
    // delete a user
    // DELETE /api/users/:user_id
        .delete(function (req, res) {
          User.remove({
            _id: req.params.user_id
          }, function (err, user) {
            if (err) { res.send(err) }
            res.json({ message: 'User deleted.' })
          })
        })

    // AUTHENTICATION ##############################################################
  router.route('/authenticate')
    // authenticate a user
    // POST /api/authenticate
        .post(function (req, res) {
          User.findOne({
            email: req.body.email
          }, function (err, user) {
            if (err) { throw err }
            if (!user) {
              res.send({
                success: false,
                message: 'Authentication failed. User not found.'
              })
            } else {
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  var token = jwt.encode(user, dbconfig.secret)
                  res.json({
                    success: true,
                    token: 'JWT ' + token
                  })
                } else {
                  res.send({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                  })
                }
              })
            }
          })
        })
}

var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) { return parted[1] } else { return null }
  } else {
    return null
  }
}

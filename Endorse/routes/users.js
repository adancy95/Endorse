const express  = require('express');
const router   = express.Router();
const bcrypt   = require("bcryptjs");
const passport = require("passport");
const async    = require('async');
const User     = require("../models/user");
const Projects = require('../models/project');


router.get('/users', (req, res, next) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => next(err))
})


router.get('/signup', (req, res, next) => {
  Projects.find()
  .then( projects => {
    res.render('users/signup', {projects})
  })
  .catch(err => next(err))
  
})

router.post('/signup', (req, res, next) => {
  const salt = bcrypt.genSaltSync(12);
  const hashPass = bcrypt.hashSync(req.body.password, salt)

  User.create({
    username: req.body.username,
    password: hashPass,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    project: req.body.project
  })
  .then(() => res.redirect('/login'))
  .catch( err => {next(err)})
})

router.get('/login', (req, res, next) => {
  res.render('users/login')
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

  
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get('/userprofile', (req, res, next) => {
  Projects.find()
  .then( projects => {
    User.findById(req.user._id)
      .then(user => {
        user.project.forEach((projectId)=>{
          projects.forEach(project => {
            if(project._id.equals(projectId)){
              project.included = true;
            }
          });
        })
          res.render("users/userProfile", {user, projects})
      })
    .catch( err => {next(err)})
  })
  .catch(err => next(err))
  
})

router.put('/editUser', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(user => {res.redirect('/userprofile')})
  .catch( err => next(err))
})

module.exports = router;
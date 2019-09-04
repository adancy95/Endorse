const express  = require('express');
const router   = express.Router();
const bcrypt   = require("bcryptjs");
const passport = require("passport");
const async    = require('async');
const User     = require("../models/user");


router.get('/users', (req, res, next) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => next(err))
})

router.get('/signup', (req, res, next) => {
  res.render('users/signup')
})

router.post('/signup', (req, res, next) => {
  const salt = bcrypt.genSaltSync(12);
  const hashPass = bcrypt.hashSync(req.body.password, salt)

  User.create({
    username: req.body.username,
    password: hashPass,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
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
  User.findById(req.user._id)
  .then(user => {res.render("users/userProfile", {user})})
  .catch( err => {next(err)})
})

router.post('/editUser', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(user => {res.redirect('/userprofile')})
  .catch( err => next(err))
})

module.exports = router;
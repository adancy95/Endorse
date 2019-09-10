const express  = require('express');
const router   = express.Router();
const bcrypt   = require("bcryptjs");
const passport = require("passport");
const async    = require('async');
const User     = require("../models/user");
const Projects = require('../models/project');
const uploadMiddleWare = require('../config/cloudinary');


router.get('/users', (req, res, next) => {
  User.find().sort({firstName: -1})
  .then(users => res.json(users))
  .catch(err => next(err))
})


router.get('/signup', (req, res, next) => {
  Projects.find()
  .then( projects => {
    res.render('Users/signup', {projects})
  })
  .catch(err => next(err))
  
})

router.post('/signup', uploadMiddleWare.single('userImage'), (req, res, next) => {
  const salt = bcrypt.genSaltSync(12);
  const hashPass = bcrypt.hashSync(req.body.password, salt)

  let image = '/images/noImage.jpg';
    if(req.file){
      image =  req.file.url;
    }
  User.create({
    username: req.body.username,
    password: hashPass,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    project: req.body.project,
    userImage: image
  })
  .then(() => res.redirect('/login'))
  .catch( err => {next(err)})
})

router.get('/login', (req, res, next) => {
  res.render('Users/login')
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
          res.render("Users/userProfile", {user, projects})
      })
    .catch( err => {next(err)})
  })
  .catch(err => next(err))
  
})

router.put('/editUser', uploadMiddleWare.single('userImage'), (req, res, next) => {
  let image = '/images/noImage.jpg';
  if(req.file){
    let image =  req.file.url;
  }
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(user => {res.redirect('/userprofile')})
  .catch( err => next(err))
})

module.exports = router;
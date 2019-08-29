const express  = require("express");
const router   = express.Router();
const Projects = require('../models/project');
const TestArtifacts = require('../models/testartifact');

router.get('/projects', (req, res, next) => {
  Projects.find()
  .then(projects => {
    res.render('Projects/allProjects', {projects})
  })
  .catch(err => next(err))
})

router.get('/Projects/:id', (req, res, next) => {
  TestArtifacts.find({project: req.params.id }).populate('project')
  .then(tickets => {
    res.render('Projects/projectDetails', {tickets})
  })
  .catch(err => next(err))
})

router.post('/projects/create', (req, res, next) => {
  Projects.create({projectName: req.body.projectName})
  .then(project => {
    res.redirect('/projects')
  })
  .catch(err => next(err))
})

router.post('/editproject/:id', (req, res, next) => {
  Projects.findByIdAndUpdate(req.params.id, {projectName: req.body.projectName})
  .then(project => {
      res.redirect('/projects')
  })
  .catch(err => next(err))
})

router.post('/deleteproject/:id', (req, res, next) => {
  console.log(req.params.id)
  Projects.findByIdAndDelete(req.params.id)
  .then(project => {
    res.redirect('/projects')
  })
  .catch(err => next(err))
})

module.exports = router;

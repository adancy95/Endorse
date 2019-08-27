const express  = require("express");
const router   = express.Router();
const Projects = require('../models/project');

router.get('/projects', (req, res, next) => {
  Projects.find()
  .then(projects => res.json(projects))
  .catch(err => next(err))
})

router.post('/projects/create', (req, res, next) => {
  Projects.create({projectName: req.body.projectName})
  .then(project => res.json(project))
  .catch(err => next(err))
})

router.post('/editproject/:id', (req, res, next) => {
  Projects.findByIdAndUpdate(req.params.id, {projectName: req.body.projectName})
  .then(project => res.json(project))
  .catch(err => next(err))
})

router.delete('/projects/:id', (req, res, next) => {
  Projects.findByIdAndDelete(req.params.id)
  .then(project => console.log("projected was deleted"))
  .catch(err => next(err))
})

module.exports = router;

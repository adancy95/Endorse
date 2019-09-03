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

router.get('/api/projects', (req, res, next) => {
  Projects.find()
  .then(projects => {
    res.json(projects)
  })
  .catch(err => next(err))
})

router.get('/api/projects/:id', (req, res, next) => {
  TestArtifacts.find({project: req.params.id }).populate('project')
  .then(artifacts => {
    res.json(artifacts)
  })
  .catch(err => next(err))
})

router.post('/api/projects/create', (req, res, next) => {
  Projects.create({projectName: req.body.projectName})
  .then(project => {
    res.json(project)
  })
  .catch(err => next(err))
})

router.put('/api/projects/update/:id', (req, res, next) => {
  Projects.findByIdAndUpdate(req.params.id, {projectName: req.body.projectName})
  .then(project => {
      res.json([{response: "The project was updated"}, project])
  })
  .catch(err => next(err))
})

router.delete('/api/projects/delete/:id', (req, res, next) => {
  Projects.findByIdAndDelete(req.params.id)
  .then(project => {
    res.json([{response: "The project was deleted"}, project])
  })
  .catch(err => next(err))
})

module.exports = router;

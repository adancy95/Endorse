const express  = require("express");
const router   = express.Router();
const Projects = require('../models/project');
const TestArtifacts = require('../models/testartifact');
const User = require("../models/user");
const WeeklyStatus = require('../models/weeklyStatus');
const moment = require('moment')

router.get('/projects', (req, res, next) => {
  
  Projects.find()
  .then(projects => {
      res.render('Projects/allProjects', {projects})
  })
  .catch(err => next(err))
})

router.get('/projects/:id', (req, res, next) => {
  User.find({'project': req.params.id}, '_id').distinct('_id')
  .then(usersAssociatedWithProject =>{
      WeeklyStatus.find({tester: {$in: usersAssociatedWithProject}}).populate('tester').sort({updated_at: -1})
      .then(statuses => {
        statuses.map(status => {
          status.formattedBeginDate = moment(status.beginDate).format("MMMM Do, YYYY"); 
          status.formattedEndDate = moment(status.endDate).format("MMMM Do, YYYY")
          status.formattedUpdatedDate = moment(status.updated_at).format("MMMM Do, YYYY")
        })
        res.render('WeeklyStatus/allWeeklyStatus', {statuses})
      })
      .catch(err => next(err))
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

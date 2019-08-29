const express       = require("express");
const router        = express.Router();
const Projects      = require('../models/project');
const TestArtifacts = require('../models/testartifact');

router.get('/testartifacts', (req, res, next) => {
  TestArtifacts.find()
  .then(tests => {
    res.render('TestArtifacts/allTestArtifacts', {tests})
  })
  .catch(err => next(err))
})

router.get('/testartifacts/artifact/:id', (req, res, next) => {
  TestArtifacts.findById(req.params.id)
  .then(test => {
    res.render('TestArtifacts/ticketDetails', {test})
  })
  .catch(err => next(err))
})

router.post('/testartifacts/create', (req, res, next) => {
  TestArtifacts.create({
    ticketNumber: req.body.ticketNumber,
    issueSummary: req.body.issueSummary,
    jiraLink: req.body.jiraLink,
    testEnvironment: req.body.testEnvironment,
    issueType: req.body.issueType,
    sprint: req.body.sprint,
    tester: req.body.tester,
    testStatus: req.body.testStatus,
    testCases: req.body.testCases,
    storyDescription: req.body.storyDescription,
    project: req.body.project
    
  })
  .then(artifact => {
    res.redirect('/testartifacts')
  })
  .catch(err => next(err))
  
})

module.exports = router;
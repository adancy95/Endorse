const express       = require("express");
const router        = express.Router();
const Projects      = require('../models/project');
const TestArtifacts = require('../models/testartifact');

router.get('/api/testartifacts', (req, res, next) => {
  TestArtifacts.find()
  .then(artifacts => {
    res.json(artifacts)
  })
  .catch(err => next(err))
})

router.get('/api/testartifacts/artifact/:id', (req, res, next) => {
  TestArtifacts.findById(req.params.id)
  .then(artifact => {
    res.json(artifact)
  })
  .catch(err => next(err))
})

router.post('/api/testartifacts/create', (req, res, next) => {
  TestArtifacts.create({
    ticketNumber: req.body.ticketNumber,
    issueType: req.body.issueType,
    tester: req.body.tester,
    ticketStatus: req.body.ticketStatus,
    comment: req.body.comment,
    project: req.body.project
    
  })
  .then(artifact => {
    res.json([{response: "The new artifact was created"},  artifact])
  })
  .catch(err => next(err))
  
})

router.put('/api/testartifacts/update/:id', (req, res, next) => {
  TestArtifacts.findByIdAndUpdate(req.params.id, {
    ticketNumber: req.body.ticketNumber,
    issueType: req.body.issueType,
    tester: req.body.tester,
    ticketStatus: req.body.ticketStatus,
    comment: req.body.comment,
    project: req.body.project
  })
  .then(updatedArtifact => {
    res.json([{response: "The test artifact was updated"}, updatedArtifact])
  })
  .catch(err => next(err))
})

router.delete('/api/testartifacts/delete/:id', (req, res, next) => {
  TestArtifacts.findByIdAndDelete(req.params.id)
  .then(deletedArtifact => {
    res.json({response: "The artifact was deleted" + deletedArtifact})
  })
  .catch(err => next(err))
})



module.exports = router;
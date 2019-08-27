const express       = require("express");
const router        = express.Router();
const Projects      = require('../models/project');
const TestArtifacts = require('../models/testartifact');

router.get('/testartifacts', (req, res, next) => {
  TestArtifacts.find()
  .then(tests => res.json(tests))
  .catch(err => next(err))
})

router.get('/testartifacts/artifact/:id', (req, res, next) => {
  TestArtifacts.findById(req.params.id)
  .then(test => res.json(test))
  .catch(err => next(err))
})

router.post('/testartifacts/create', (req, res, next) => {
  
})

module.exports = router;
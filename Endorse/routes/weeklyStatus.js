const express = require('express');
const router = express.Router();
const WeeklyStatus = require('../models/weeklyStatus');
const TestArtifacts = require('../models/testartifact');

router.get('/weeklystatus', (req, res, next) => {
  WeeklyStatus.find()
  .then(statuses => {
    res.render('WeeklyStatus/allWeeklyStatus', {statuses})
  })
  .catch(err => next(err))
})

router.get('/api/weeklystatus', (req, res, next) => {
  WeeklyStatus.find()
  .then(statuses => {
    res.json(statuses)
  })
  .catch(err => next(err))
})

router.get('/api/weeklystatus/status/:id', (req, res, next) => {
  WeeklyStatus.findById(req.params.id)
  .then(status => {
    res.json(status)
  })
  .catch(err => next(err))
})

router.post('/api/weeklystatus/create', (req, res, next) => {
  WeeklyStatus.create({
    tester: req.body.tester,
    beginDate: req.body.beginDate,
    endDate: req.body.endDate,
    bugsCreated: req.body.bugsCreated,
    ticketsRejected: req.body.ticketsRejected,
    stories: req.body.stories,
    blockers: req.body.blockers,
    general: req.body.general,
    nextWeek: req.body.nextWeek,
    testCases: req.body.testCases,
    project: req.body.project,
    comment: req.body.comment
  })
  .then(status => {
    res.json([{response: "The weekly status was created"},  status])
  })
  .catch(err => next(err))
  
})

router.put('/api/weeklystatus/update/:id', (req, res, next) => {
  WeeklyStatus.findByIdAndUpdate(req.params.id, {
    tester: req.body.tester,
    beginDate: req.body.beginDate,
    endDate: req.body.endDate,
    bugsCreated: req.body.bugsCreated,
    ticketsRejected: req.body.ticketsRejected,
    stories: req.body.stories,
    blockers: req.body.blockers,
    general: req.body.general,
    nextWeek: req.body.nextWeek,
    testCases: req.body.testCases,
    project: req.body.project,
    comment: req.body.comment
  })
  .then(updatedStatus => {
    res.json([{response: "The weekly status was updated"}, updatedStatus])
  })
  .catch(err => next(err))
})

router.delete('/api/weeklystatus/delete/:id', (req, res, next) => {
  WeeklyStatus.findByIdAndDelete(req.params.id)
  .then(deletedStatus => {
    res.json({response: "The weekly status was deleted" + deletedStatus})
  })
  .catch(err => next(err))
})



module.exports = router;
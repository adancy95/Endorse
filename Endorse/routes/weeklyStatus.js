const express = require('express');
const router = express.Router();
const WeeklyStatus = require('../models/weeklyStatus');
const TestArtifacts = require('../models/testartifact');
const moment = require('moment')


router.get('/weeklystatus/:searchType', (req, res, next) => {
  let searchQuery;
  if(req.params.searchType === 'all'){
    searchQuery = {};
  }else if(req.params.searchType === 'user'){
    searchQuery = {tester: req.user._id}
  }else if(req.params.searchType === req.params.id){
    searchQuery = {tester: req.params.id}
  }
  WeeklyStatus.find(searchQuery).populate('tester').sort({updated_at: -1})
  .then(statuses => {
    statuses.map(status => {
      status.formattedBeginDate = moment(status.beginDate).format("MMMM Do, YYYY"); 
      status.formattedEndDate = moment(status.endDate).format("MMMM Do, YYYY")
      status.formattedUpdatedDate = moment(status.updated_at).format("MMMM Do, YYYY")
    });
    res.render('WeeklyStatus/allWeeklyStatus', {statuses})
  })
  .catch(err => next(err))
})

router.get('/api/weeklystatus', (req, res, next) => {
  WeeklyStatus.find().populate('tester')
  .then(statuses => {
    res.json(statuses)
  })
  .catch(err => next(err))
})

router.get('/api/weeklystatus/status/:id', (req, res, next) => {
  WeeklyStatus.findById(req.params.id)
  .then(status => {
      let beginDateVal = moment(status.beginDate).format('YYYY-MM-DD')
      let endDateVal = moment(status.endDate).format('YYYY-MM-DD')
    res.json({status, beginDateVal, endDateVal })
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
    testCases: req.body.testCases
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
const express = require('express');
const router = express.Router();
const WeeklyStatus = require('../models/weeklyStatus');
const TestArtifacts = require('../models/testartifact');
const moment = require('moment')

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


router.get('/weeklystatus/:searchType', (req, res, next) => {
  let searchQuery;
  if(req.params.searchType === 'all'){
    searchQuery = {};
  }else if(req.params.searchType === 'user'){
    searchQuery = {tester: req.user._id}
  }else{
    searchQuery = {tester: req.params.searchType}
  }
  WeeklyStatus.find(searchQuery).populate('tester').sort({updated_at: -1})
  .then(statuses => {
    
    statuses.map(status => {
      status.formattedBeginDate = moment(status.beginDate).format("MMMM Do, YYYY"); 
      status.formattedEndDate = moment(status.endDate).format("MMMM Do, YYYY")
      status.formattedUpdatedDate = moment(status.updated_at).format("MMMM Do YYYY, h:mm a")
      if( req.user && req.user._id.equals(status.tester._id)){
        status.statusOwnerTrue = "true";
      } else{
        status.statusOwnerFalse = "false";
        req.flash('error', "Permission Error: Do Not Have Permission to Delete or Edit This Item ")
      }
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
  WeeklyStatus.findById(req.params.id).populate('tester')
  .then(status => {
      let beginDateVal = moment(status.beginDate).format('YYYY-MM-DD')
      let endDateVal = moment(status.endDate).format('YYYY-MM-DD')
      let formattedBeginDate = moment(status.beginDate).format("MMMM Do, YYYY"); 
      let formattedEndDate = moment(status.endDate).format("MMMM Do, YYYY")
      let formattedUpdatedDate = moment(status.updated_at).format("MMMM Do YYYY, h:mm a")
    res.json({status, beginDateVal, endDateVal, formattedBeginDate, formattedEndDate,  formattedUpdatedDate })
  })
  .catch(err => next(err))
})

router.post('/api/weeklystatus/create', ensureAuthenticated, (req, res, next) => {
  WeeklyStatus.create({
    tester: req.body[0].value,
    beginDate: req.body[1].value,
    endDate: req.body[2].value,
    stories: req.body[3].value,
    bugsCreated: req.body[4].value,
    ticketsRejected: req.body[5].value,
    blockers: req.body[6].value,
    general: req.body[7].value,
    nextWeek: req.body[8].value,
    testCases: req.body[9].value,
  })
  .then(status => {
    res.json([{response: "The weekly status was created"},  status])
  })
  .catch(err => next(err))
  
})

router.put('/api/weeklystatus/update/:id', ensureAuthenticated, (req, res, next) => {
  
  WeeklyStatus.findByIdAndUpdate(req.params.id, {
    tester: req.body[0].value,
    beginDate: req.body[1].value,
    endDate: req.body[2].value,
    stories: req.body[3].value,
    bugsCreated: req.body[4].value,
    ticketsRejected: req.body[5].value,
    blockers: req.body[6].value,
    general: req.body[7].value,
    nextWeek: req.body[8].value,
    testCases: req.body[9].value
  })
  .then(updatedStatus => {
    res.json([{response: "The weekly status was updated"}, updatedStatus])
  })
  .catch(err => next(err))
})

router.delete('/api/weeklystatus/delete/:id', ensureAuthenticated, (req, res, next) => {
  WeeklyStatus.findByIdAndDelete(req.params.id)
  .then(deletedStatus => {
    res.json({response: "The weekly status was deleted" + deletedStatus})
  })
  .catch(err => next(err))
})




module.exports = router;
const express = require('express');
const router = express.Router();
const WeeklyStatus = require('../models/weeklyStatus');
const TestArtifacts = require('../models/testartifact');
const moment = require('moment')
const sgMail = require('@sendgrid/mail');
const CronJob = require('cron').CronJob


new CronJob('* * * * * 1', function() {
  WeeklyStatus.find()
  .then(statuses => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
      to: process.env.EMAIL_FROM,
      from: process.env.EMAIL_RECIPIENT,
      subject: 'Weekly Status Reports for the Week of',
      text: 'Here is the weekly status recap',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg)
    .then(() => {
      console.log("sent")
    })
    .catch((err) => {console.log(err)});
  })
  .catch(err => console.log(err))



}, null, true, 'America/Los_Angeles');





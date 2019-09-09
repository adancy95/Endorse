const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weeklyStatusSchema = new Schema({
  tester: {type: Schema.Types.ObjectId, ref: 'User'},
  beginDate: Date,
  endDate: Date,
  bugsCreated: String,
  ticketsRejected: String, 
  stories: String,
  blockers: String,
  general: String,
  nextWeek: String,
  testCases: String,
},
{
  timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
})

const WeeklyStatus = mongoose.model('WeeklyStatus',  weeklyStatusSchema);
module.exports = WeeklyStatus;
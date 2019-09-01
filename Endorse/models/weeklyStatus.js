const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weeklyStatusSchema = new Schema({
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  beginDate: Date,
  endDate: Date,
  bugsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'TestArtifact'
    }
  ],
  ticketsRejected: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'TestArtifact'
    }
  ],
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'TestArtifact'
    }
  ],
  blockers: String,
  general: String,
  nextWeek: String,
  testCases: String,
  project: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Project'
    }
  ],
  comment: [String]

},
{
  timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
})

const WeeklyStatus = mongoose.model('WeeklyStatus',  weeklyStatusSchema);
module.exports = WeeklyStatus;
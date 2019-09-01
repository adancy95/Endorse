const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weeklyStatusSchema = new Schema({
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  bugsCreated: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestArtifact'}],
  ticketsRejected: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestArtifact'}],
  stories: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestArtifact'}],
  blockers: String,
  general: String,
  nextWeek: String,
  hiptest: String,
  project: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]

},
{
  timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
})

const WeeklyStatus = mongoose.model('WeeklyStatus',  weeklyStatusSchema);
module.exports = WeeklyStatus;
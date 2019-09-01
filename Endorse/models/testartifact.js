const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testArtifactSchema = new Schema({
  ticketNumber: {
    type: String,
    required: true
  },
  issueType: String,
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ticketStatus: {
    type: String,
    enum: ["Accepted", "Rejected", "In Testing", "Blocked", "Created"]
  },
  comment: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
},
{
  timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
})


const TestArtifact = mongoose.model('TestArtifact', testArtifactSchema);
module.exports = TestArtifact;
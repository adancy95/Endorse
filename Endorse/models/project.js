const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },
},
{
  timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
})


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
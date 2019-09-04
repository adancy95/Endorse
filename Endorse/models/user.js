const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  project: [{type: Schema.Types.ObjectId, ref: 'Project'}]
},
{
  timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
})

const User = mongoose.model('User', userSchema);
module.exports = User;
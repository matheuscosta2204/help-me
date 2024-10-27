const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  subtitle: { type: String, maxlength: 150 },
  description: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  poster: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Referencing User model
    required: true 
  },
});

module.exports = mongoose.model('Post', postSchema);

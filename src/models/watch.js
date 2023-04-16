const mongoose = require('mongoose');

const watch = new mongoose.Schema({
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  id: {
    type: Number
  },
  status: {
    type: Boolean
  },
  linkVideo: {
    type: String
  }
});

module.exports = mongoose.model('watchs', watch);
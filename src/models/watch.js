const mongoose = require('mongoose');

const watch = new mongoose.Schema({
  category: {
    type: String
  },
  id: {
    type: Number
  },
  status: {
    type: Boolean
  }
});

module.exports = mongoose.model('watchs', watch);
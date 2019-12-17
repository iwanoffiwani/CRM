const mongoose = require('mongoose')
const Schema = mongoose.Schema

const status = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  }
})

module.exports = mongoose.model('statuses', status)

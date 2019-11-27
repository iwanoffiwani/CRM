const mongoose = require('mongoose')
const Schema = mongoose.Schema

const field = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('fields', field)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const crater = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('craters', crater)

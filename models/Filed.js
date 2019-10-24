const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filed = new Schema({
  name: {
    type: String,
    required: true
  },

})

module.exports = mongoose.model('fileds', filed)

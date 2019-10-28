const mongoose = require('mongoose')
const Schema = mongoose.Schema

const request = new Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  status:{
    type: String
  }  
})

module.exports = mongoose.model('requests', request)


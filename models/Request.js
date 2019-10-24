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
    ref: 'craters',
    type: Schema.Types.ObjectId
  }  
})

module.exports = mongoose.model('requests', request)


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comment = new Schema({
  content: {
    type: String
  },
  data: {
    type: Data,
    default: Data.now
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  request: {
    ref: 'requests',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('comments', comment)

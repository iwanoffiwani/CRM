const mongoose = require('mongoose')
const Schema = mongoose.Schema

const order = new Schema({
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  fields: [
    {
      name: {
        type: String
      },
      value: {
        type: String,
        default: ''
      }
    }
  ],
  status: {
    type: String,
    required: true
  }, 
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('orders', order)


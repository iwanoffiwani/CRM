const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filed = new Schema({
  name: {
    type: String,
    required: true
  },
  list: [
    { 
      name: { 
        type: String
      }
    }
  ],
  requestId:{
    type: String,
  }
})

module.exports = mongoose.model('fileds', filed)

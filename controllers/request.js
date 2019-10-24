const Request = require('../models/Request')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const requests = 
      await mongoose
        .model('requests')
          .find({}, null)

    res.status(200).json(requests)
  } catch(e) {
    errorHandler(res, e)
  }
}

// module.exports.getById = async (req, res) => {
//   try {

//   } catch(e) {
    
//   }
// }

module.exports.create = async (req, res) => {
  try {
    const crater = 
      await mongoose
        .model('craters')
          .findOne({}, null)
            .sort({ _id: 1 })

    const request = 
      await new Request({
        name: req.body.name,
        user: req.user.id,
        status: crater._id
      }).save()

    res.status(201).json(request)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await mongoose
      .model('requests')
        .deleteOne({ _id: req.params.id })

    res.status(200).json({ message: `Заявка успешно удалена` })
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const updated = {
      name: req.body.name,
      status: req.body.status
    }

    const request = await Craters.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    
    res.status(200).json(request)
  } catch(e) {
    errorHandler(res, e)
  }
}

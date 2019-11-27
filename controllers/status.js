const Status = require('../models/Status')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const craters = 
      await mongoose
        .model('statuses')
          .find({})

    return res.status(200).json(craters)  
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const crater = 
      await new Status({
        name: req.body.name
      }).save()

    return res.status(201).json(crater)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await mongoose
      .model('statuses')
        .deleteOne({ _id: req.params.id })

    return res.status(200).json({ message: `Категория удалена` })
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const crater = await Craters.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    )
    
    return res.status(200).json(crater)
  } catch(e) {
    errorHandler(res, e)
  }
}

const Field = require('../models/Field')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const fields =
      await mongoose
        .model('fields')
          .find()

    return res.status(200).json(fields)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const field = 
      await new Field({
        name: req.body.name
      }).save()

    return res.status(201).json(field)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    const field = 
      await mongoose
        .model('fields')
          .deleteOne({ _id: req.params.id })

    return res.status(200).json(`Поле успешно удалено`)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const field =
      await mongoose
        .model('fields')
          .findOneAndUpdate(
            { _id: req.params.id },
            { $set: { name: req.body.name } },
            { new: true }
          )
    return res.json(200).json(field)
  } catch(e) {
    errorHandler(res, e)
  }
}

const Status = require('../models/Status')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const statuses = 
      await Status.find({})

    return res.status(200).json(statuses)  
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const status = 
      await new Status({
        name: req.body.name,
        color: req.body.color
      }).save()

    return res.status(201).json(status)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Status.deleteOne({ _id: req.query.id })

    return res.status(200).json({ message: `Категория удалена` })
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const crater = await Status.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { ...req.body } },
      { new: true }
    )
    
    return res.status(200).json(crater)
  } catch(e) {
    errorHandler(res, e)
  }
}

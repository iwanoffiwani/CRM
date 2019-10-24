const Craters = require('../models/Crater')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const craters = 
      await mongoose
        .model('craters')
          .find({}, null)

    res.status(200).json(craters)  
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
      await new Craters({
        name: req.body.name
      }).save()

    res.status(201).json(crater)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await mongoose
      .model('craters')
        .deleteOne({ _id: req.params.id })

    res.status(200).json({ message: `Категория удалена` })
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const updated = {
      name: req.body.name      
    }

    const crater = await Craters.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    
    res.status(200).json(crater)
  } catch(e) {
    errorHandler(res, e)
  }
}

const Order = require('../models/Order')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const requests = 
      await mongoose
        .model('orders')
          .find({ user: req.user.id })
            .sort({ data: -1 }) //Sort by Date Added DESC
          
    return res.status(200).json(requests)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const order = 
      await new Order({
        name: req.body.name,
        user: req.user.id,
        fields: req.body.fields,
        status: req.body.status
      }).save()
    
    return res.status(201).json('Ваша заявка успешно добавлена')
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await mongoose
      .model('requests')
        .deleteOne({ _id: req.params.id })

    return res.status(200).json({ message: `Заявка успешно удалена` })
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
    
    return res.status(200).json(request)
  } catch(e) {
    errorHandler(res, e)
  }
}

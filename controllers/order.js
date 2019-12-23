const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const order = 
      await Order.find({ user: req.user.id })
        .sort({ data: -1 }) //Sort by Date Added DESC
          
    return res.status(200).json(order)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const order = 
      await Order.findOne({ _id: req.params.id })

    return res.status(200).json(order)

  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    console.log(req.body.status)

    await new Order({
      name: req.body.name,
      user: req.user.id,
      fields: req.body.fields,
      status: req.body.status
    }).save()
    
    return res.status(201)
      .json('Ваша заявка успешно добавлена')
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id })

    return res.status(200).json({ message: `Заявка успешно удалена` })
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    await Order.findOneAndUpdate(
      { _id: req.query.id },
      { $set: {
          ...req.body
        }
      },
      { new: true } 
    )

    const update = await Order.findOne({ _id: req.query.id })

    return res.status(200).json(update)
  } catch(e) {
    errorHandler(e)
  }
}

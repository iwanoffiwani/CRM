const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const requests = 
      await Order.find({ user: req.user.id })
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
    await Order.deleteOne({ _id: req.params.id })

    return res.status(200).json({ message: `Заявка успешно удалена` })
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const order = 
      await Order.findOneAndUpdate(
        { _id: req.query.id },
        { ...req.body },
        { new: true } 
      )

    return res.status(200).json(order)
  } catch(e) {
    errorHandler(e)
  }
}

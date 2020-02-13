const Field = require('../models/Field')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const fields =
      await Field.find()

    return res.status(200).json(fields)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const field = await new Field({ name: req.body.name }).save()

    await Order.updateMany(
      {}, 
      { 
        '$push': { 
          'fields' : field
        } 
      }, 
      { isDeleted: true }
    )

    return res.status(201).json(field)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Field.deleteOne({ _id: req.query.id })
    
    // Example from stack overflow https://ru.stackoverflow.com/questions/336504/mongodb-%D1%83%D0%B4%D0%B0%D0%BB%D0%B8%D1%82%D1%8C-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B8%D0%B7-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0
    // db.table.update({"_id": ObjectId("53c15d98aa4719f45076d5ed")}, {"$pull": { "contact.phone": {"_id": ObjectId("53c8b57ea9f447680b217dd6")} } })

    await Order.updateMany(
      {}, 
      { 
        '$pull': { 
          'fields': { 
            '_id': req.query.id 
          } 
        } 
      }, 
      { isDeleted: true }
    )

    return res.status(200).json(`Поле успешно удалено`)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    await Field.findOneAndUpdate(
      { 
        _id: req.query.id 
      },
      { 
        $set: { 
          name: req.body.name 
        } 
      },
      { 
        new: true 
      }
    )

    await Order.updateMany(
      { 
        'fields._id': req.query.id 
      }, 
      { 
        'fields.$.name': req.body.name 
      }, 
      { 
        isDeleted: true 
      }
    )

    return res.json(200).json('Поле успешно отредактировано')
  } catch(e) {
    errorHandler(res, e)
  }
}

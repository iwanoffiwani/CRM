const Field = require('../models/Field')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    
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

    const field = 
      await new Field({
        name: req.body.name,
        list: req.body.list,
        multi: req.body.multi
      }).save()

    res.status(201).json(field)
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    
  } catch(e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    
  } catch(e) {
    errorHandler(res, e)
  }
}

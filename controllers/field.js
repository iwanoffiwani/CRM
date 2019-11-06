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

    const newField = { name: req.body.name, list: req.body.list }

    // const typeField = req.body.field
    // console.log('LIST', req.body.list);

    // switch(typeField) {
    //   case 1:
    //     newField.list = req.body.list
    //   default:
    //     newField;
    // }

    const field = await new Field(newField).save()

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

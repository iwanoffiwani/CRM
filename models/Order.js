const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
  Модель заявки содержит:
  ## - Имя
  ## - Статус (воронка продаж)
  ## - Поля для заполнения (количество полей регулируется из модели ./modeil/Field.js)
  ## - Комментарии
  ## - Изменения (Поле содержит объекты с предыдущими, новыми изменениями и датой изменения)
  ## - Дата создания заявки 
*/

const order = new Schema({
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  fields: [
    {
      name: {
        type: String
      },
      value: {
        type: String,
        default: ''
      }
    }
  ],
  comments: [
    {
      user: {
        type: String
      },
      content: {
        type: String
      },
      data: {
        type: Date,
        default: Date.now
      }
    }
  ],
  changes: [
    {
      user: {
        type: String
      },
      previousState: {
        type: Object
      },
      nextState: {
        type: Object
      },
      data: {
        type: Date,
        default: Date.now
      }
    },
  ],
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('orders', order)


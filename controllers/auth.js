const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')

const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async (req, res) => {
  const candidate = 
    await User.findOne({
      login: req.body.login
    })

  if (!candidate)
    return res.status(404).json({
      message: `Неверный логин или пароль`
    })

  const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

  if (!passwordResult)
    return res.status(404).json({
      message: `Неверный логин или пароль`
    })

  const token = jwt.sign({
    login: candidate.login,
    UserId: candidate._id  
  }, keys.JWT, {
    expiresIn: 60 * 60 * 24 // Время существования токена
  }) // Генерируем токен

  return res.status(200).json({
    token: `Bearer ${token}`
  })
}

module.exports.register = async (req, res) => {
  const candidate = 
    await User.findOne({
      login: req.body.login
    })

  if (candidate) 
    return res.status(409).json({
      message: `Пользователь с такий логином уже существует 
      попробуйте другой`
    })

  const salt = bcrypt.genSaltSync(10)
  
  const password = req.body.password

  const user = new User({
    login: req.body.login,
    password: bcrypt.hashSync(password, salt)
  })

  try {
    await user.save() 

    return res.status(201).json(user)
  } catch(e) {
    errorHandler(res, e)
  }
}
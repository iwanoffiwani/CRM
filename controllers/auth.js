const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async (req, res) => {
  const candidate = 
    await User.findOne({
      login: req.body.login
    })

  const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
 
  if (!candidate || !passwordResult)
    return res.status(404).json({
      message: `Неверный логин или пароль`
    })

  const token = jwt.sign({
    login: candidate.email,
    id: candidate._id  
  }, keys.JWT, {
    expiresIn: 60 * 60 * 24
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
    console.log(`При добавлении пользователя произошла ошибка`)
  }
}
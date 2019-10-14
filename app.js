const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouters = require('./routes/auth')

const keys = require('./config/keys')

mongoose.connect(keys.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

mongoose.set('useCreateIndex', true);

// app.use(passport.initialize())
// require('./middlewear/passport')(passport)

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use('/api/auth', authRouters)

module.exports = app
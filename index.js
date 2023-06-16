import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js'
import { validationResult } from 'express-validator'

import UserSchema from './models/User.js'

mongoose
  .connect('mongodb+srv://kristgalstyan417:8520@cluster0.ck2qhkg.mongodb.net/')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  res.json({
    success: true
  })
})

app.listen(process.env.PORT)

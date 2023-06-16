import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js'
import { validationResult } from 'express-validator'

import UserSchema from './models/User.js'

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/register', registerValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  const password = req.body.password
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const doc = UserSchema({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash
  })
  const user = await doc.save()
  res.send(user)
})

app.listen(process.env.PORT)

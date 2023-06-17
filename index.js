import express from 'express'

import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js'

import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js'

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/login', login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth, getMe)

app.listen(process.env.PORT)

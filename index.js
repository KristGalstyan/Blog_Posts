import express from 'express'

import mongoose from 'mongoose'

import {
  registerValidation,
  loginValidation,
  postCreateValidation
} from './validations.js'

import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js'
import {
  create,
  getAll,
  getOne,
  remove,
  update
} from './controllers/PostController.js'

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth, getMe)

app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, create)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', update)

app.listen(process.env.PORT)

import express from 'express'
import multer from 'multer'

import mongoose from 'mongoose'
import connectMongoSession from 'connect-mongodb-session'
import cors from 'cors'
import {
  registerValidation,
  loginValidation,
  postCreateValidation
} from './validations.js'

import {
  create,
  getAll,
  getOne,
  remove,
  update,
  getMe,
  login,
  register
} from './controllers/import.js'

import { checkAuth, handleValidationError } from './utils/import.js'
import { getLastTags } from './controllers/PostController.js'
import session from 'express-session'

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(
  session({
    name: 'cokie',
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 5000 },
    saveUninitialized: false
  })
)

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationError, login)
app.post('/auth/register', registerValidation, handleValidationError, register)
app.get('/auth/me', checkAuth, getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/posts', getAll)

app.get('/tags', getLastTags)
app.get('/posts/:id', getOne)
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationError,
  create
)
app.delete('/posts/:id', checkAuth, remove)
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationError,
  update
)

app.listen(process.env.PORT)

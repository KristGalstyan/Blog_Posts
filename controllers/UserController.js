import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserSchema from '../models/User.js'

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = UserSchema({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.SECRET,
      { expiresIn: '30d' }
    )

    const { passwordHash, ...userData } = user._doc

    res.send({
      ...userData,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: 'Пользватель не найден' })
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    )

    if (!isValidPass) {
      return res.status(400).json({ message: 'Не верный логин или пароль' })
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.SECRET,
      { expiresIn: '30d' }
    )
    const { passwordHash, ...userData } = user._doc

    res.send({
      ...userData,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId)
    if (!user) {
      res.status(404).json({
        message: 'Пользователь не найден'
      })
    }
    const { passwordHash, ...userData } = user._doc

    res.send(userData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
}

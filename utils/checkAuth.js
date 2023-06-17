import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '')

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      req.userId = decoded._id
      next()
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа'
      })
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа'
    })
  }
}

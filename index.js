import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hell')
})

app.post('/auth/login', (req, res) => {
  res.json({
    success: true
  })
})

app.listen(process.env.PORT)

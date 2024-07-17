import express from 'express'
import User from '../models/User.js'

const app = express()
app.use(express.json())

// You can delete this endpoint
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Nozama!', time: Date.now() })
})

// TODO: add endpoints during the workshop
app.post('/users', async (req, res) => {
  const user = await User.create(
    req.body.username,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.avatar,
    req.body.password
  )
  res.json(user)
  //console.log(req.body)
  //console.log(req.headers)
  //res.sendStatus(200)
})

export default app

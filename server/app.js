import express from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'

const app = express()
app.use(express.json())

// You can delete this endpoint
app.get('/', (req, res) => {
  const timestamp = new Date()
  res.json({ msg: 'Welcome to Nozama!', time: timestamp.toLocaleString() })
})

// TODO: add endpoints during the workshop
app.get('/users/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.json(user)
})

app.post('/users', async (req, res) => {
  const user = await User.create(
    req.body.username,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.avatar
  )

  if (!user.result) {
    res.statusMessage = 'Unable To Process Request'
    res.status(422)
    res.json({
      status: 'Error',
      statusCode: 422,
      error: {
        code: 'USER_NOT_CREATED',
        message: `Unable to create user ${req.body.username}`,
        details: `Error with create user action - reason: ${user.reason}`,
        timestamp: new Date(),
        path: req.url
      }
    })
  } else {
    res.status(201)
    res.json({ 
      status: 'Created',
      statusCode: 201,
      action: {
        code: 'USER_CREATED',
        message: `Created user ${user.id}:${user.username}`,
        details: user,
        timestamp: new Date(),
        path: req.url
      }
    })
  }
  //console.log(req.url)
  //console.log(req.body)
  //console.log(req.headers)
  //res.sendStatus(200)
})

// Products (API)
app.get('/products/', async (req, res) => {
  const allProducts = await Product.findAll()
  res.json(allProducts)
})

export default app

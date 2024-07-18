import express from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Review from '../models/Review.js'

const app = express()
app.use(express.json())

// You can delete this endpoint
app.get('/', (req, res) => {
  const timestamp = new Date()
  res.json({ msg: 'Welcome to Nozama!', time: timestamp.toLocaleString() })
})

// Users (API)
app.get('/users/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.json(user)
})

app.post('/users/login', async (req, res) => {
  /**
   * Return user details if authenticated, otherwise return 401 and error response
  */
  const isAuthenticated = await User.login(req.body.username, req.body.password)

  if (isAuthenticated.result && isAuthenticated.data) {
    res.json(isAuthenticated.data)
    return
  }

  res.status(401)
  res.json({
    status: 'Unauthorised',
    statusCode: 401,
    error: {
      code: 'UNAUTHORISED',
      message: `Unauthorised credentials given for ${req.body.username}`,
      details: `Unauthorised reason: ${isAuthenticated.reason}`,
      timestamp: new Date(),
      path: req.url
      }
  }) 
})

app.post('/users', async (req, res) => {
  const createUserPost = req.body
  const user = await User.create(
    createUserPost.username,
    createUserPost.firstName,
    createUserPost.lastName,
    createUserPost.email,
    createUserPost.avatar,
    createUserPost.password,
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
app.get('/products', async (req, res) => {
  const allProducts = await Product.findAll()
  res.json(allProducts)
})

app.get('/products/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId)
  res.json(product)
})

app.get('/products/category/:categoryId', async (req, res) => {
  const products = await Product.findByCategory(req.params.categoryId)
  res.json(products)
})

// Reviews (API)
app.get('/reviews/:productId', async (req, res) => {
  const productReview = await Review.findByProduct(req.params.productId)
  res.json(productReview)
})

export default app

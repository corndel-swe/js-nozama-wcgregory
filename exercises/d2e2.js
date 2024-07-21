import express from 'express'
const app = express()

/**
 * Hint: res.send() will not accept numbers - you will need to
 * convert your result to a string before using res.send()
 */

// https://tech-docs.corndel.com/express/query-params.html
app.get('/sumup', (req, res) => {
  /**
   * This endpoint accepts a query param, n
   * res.send() the sum of integers from 1 to n
   * if n is not given, respond with 0
   * e.g. /sumup?n=4 => 10
   */
  const num = req.query.n ? parseInt(req.query.n) : 0
  let sum = 0
  for (let i = 1; i <= num; i++) {
    sum += i
  }
  res.send(sum.toString())
})

// https://tech-docs.corndel.com/express/query-params.html
app.get('/multiply/:x/:y', (req, res) => {
  /**
   * This endpoint responds with the product of x and y
   * e.g. /multiply/:3/:5 => 15
   */
  const multiply = parseInt(req.params.x) * parseInt(req.params.y)
  res.send(multiply.toString())
})

export default app

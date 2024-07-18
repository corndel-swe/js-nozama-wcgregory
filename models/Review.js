import db from '../db/index.js'

class Review {
  static async reviewByProduct(productId) {
    const query = `
      SELECT id, productId, userId, rating, reviewText, reviewDate 
      FROM reviews
      WHERE productId = ?;
    `
    const results = await db.raw(query, [productId])
    return results[0]
  }
}

export default Review
import db from '../db/index.js'

class Product {
  static async findAll() {
    const query = `
      SELECT id, name, description, price, stockQuantity, imageURL 
      FROM products;
    `
    const results = await db.raw(query)
    return results
  }

  static async findById(id) {
    const query = `
      SELECT id, name, description, price, stockQuantity, imageURL 
      FROM products
      WHERE id = ?;
    `
    const results = await db.raw(query, [id])
    return results[0]
  }
}

export default Product
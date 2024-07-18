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

  static async findByCategory(categoryId) {
    const query = `
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.stockQuantity,
        products.imageURL
      FROM product_categories
      INNER JOIN products ON product_categories.productId = products.id
      WHERE product_categories.categoryId = ?;
    `
    const results = await db.raw(query, [categoryId])
    return results
  }
}

export default Product
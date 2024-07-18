import db from '../db/index.js'
import Category from './Category.js'

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

  static async findByName(name) {
    const query = `
      SELECT id, name, description, price, stockQuantity, imageURL 
      FROM products
      WHERE name = ?;
    `
    const results = await db.raw(query, [name])
    return results[0]
  }

  static async findByCategory(categoryId) {
    return await Category.findProductsByCategory(categoryId)
  }

  static async create(name, description, price, quantity, imageURL) {
    const image = imageURL ? imageURL : "https://picsum.photos/seed/X53bA/640/480"
    const productExists = await Product.findByName(name)
    if (productExists) return {"result": false, "reason": "Unable to create product!"};
    const query = `
      INSERT INTO products (name, description, price, quantity, imageURL)
      VALUES (?, ?, ?, ?, ?, ?) RETURNING *;
    `
    const addedProduct = await db.raw(query, [name, description, price, quantity, imageURL])
    return {"result": true, "created": addedProduct[0]}
  }

  static async addProductToCategory(productId, categoryId) {
    const productExists = await Product.findById(productId)
    const categoryExists = await Category.findById(categoryId)
    if (!productExists || !categoryExists) {
      return {"result": false, "reason": "Unable to add product to category!"}
    }
    const query = `
      INSERT INTO products_categories (productId, categoryId)
      VALUES (?, ?) RETURNING *;
    `
    const addedProductToCategory = await db.raw(query, [productId, categoryId])
    return {"result": true, "created": addedProductToCategory[0]}
  }
}

export default Product
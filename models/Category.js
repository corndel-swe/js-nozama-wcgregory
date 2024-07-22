import db from '../db/index.js'

class Category {
  static async findById(id) {
    const query = `
      SELECT id FROM categories WHERE id = ?;
    `
    const results = await db.raw(query, [id])
    return results[0]
  }

  static async findByProductId(productId) {
    const query = `
      SELECT productId FROM product_categories WHERE productId = ?;
    `
    const results = await db.raw(query, [productId])
    return results[0]
  }

  static async findProductsByCategory(categoryId) {
    const query = `
      SELECT
        products.id,
        categories.name AS category,
        products.name,
        products.description,
        products.price,
        products.stockQuantity,
        products.imageURL
      FROM product_categories
      INNER JOIN products ON product_categories.productId = products.id
      INNER JOIN categories ON product_categories.categoryId = categories.id
      WHERE product_categories.categoryId = ?;
    `
    const results = await db.raw(query, [categoryId])
    return results
  }

}

export default Category
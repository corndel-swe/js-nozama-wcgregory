import db from '../db/index.js'

class Product {
  static async findAll() {
    const query = `
      select id, name, description, price, stockQuantity, imageURL 
      from products;
    `
    const results = await db.raw(query)
    return results
  }
}

export default Product
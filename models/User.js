import { boolean } from 'zod'
import db from '../db/index.js'

class User {
  static async findAll() {
    const query = `
      select id, username, firstName, lastName, email, avatar 
      from users;
    `
    const results = await db.raw(query)
    return results
  }

  static async findById(id) {
    /**
     * TODO: finish this method
     */
    const query = `
      SELECT id, username, firstName, lastName, email, avatar
      FROM users WHERE id = ?;
    `
    const results = await db.raw(query, [id])
    return results[0]
  }

  static async findByUserName(username) {
    const query = `
      SELECT id, username, firstName, lastName, email, avatar
      FROM users WHERE username = ?;
    `
    const results = await db.raw(query, [username])
    return results[0]
  }

  static async create(username, firstName, lastName, email, avatar = '', password) {
    const userExists = await User.findByUserName(username)
    //if (userExists) return {"result": false, "reason": `Username ${username} already exists!`};
    if (userExists) return {"result": false, "reason": "Unable to create user!"};
    const query = `
      INSERT INTO users (username, firstName, lastName, email, avatar, password)
      VALUES (?, ?, ?, ?, ?, ?) RETURNING *;
    `
    const addedUser = await db.raw(query, [
      username, firstName, lastName, email, avatar, password
    ])
    delete addedUser[0].password
    return {"result": true, "created": addedUser[0]}
  }

  static async delete(id) {
    const query = `
      DELETE FROM users WHERE users.id = ? RETURNING *;
    `
    const idExists = await User.findById(id)
    if (idExists) return {"result": false, "reason": `User id ${id} doesn't exist!`};
    else {const deletedUser = await db.raw(query, [id])
      delete deletedUser[0].password
      return {"result": true, "deleted": deletedUser[0]}
    }
  }

  static async login(username, password) {
    const query = `
        SELECT password
        FROM users WHERE username = ?;
      `
    const userSearch = await User.findByUserName(username)
    if (userSearch) {
      const userPassword = await db.raw(query, [username])
      if (userPassword[0].password === password) return userSearch;
    }
    return {"result": false, "reason": `Username or password is invalid!`}
  }
}

export default User

//console.log(await User.create('fab5freddy', 'Freddy', 'Flintstone', 'fab5freddy@gmail.com', 'None.img', '12345LetMeIn'))
//console.log(await User.findById(202))
//console.log(await User.findByUserName('Spencer_Pfeffe'))
//console.log(await User.delete(203))
//console.log(await User.findById(200))
//console.log(await User.login('fab5freddy', '12345LetMe'))
//db.destroy()
import knex from 'knex'
import { fileURLToPath } from 'url'

/**
 * TODO: Follow the steps required to connect to the database using knex
 * Make sure your default export is a const called db
 */
const dbPath = new URL('./db.sqlite', import.meta.url)

const db = knex({
  client: 'sqlite3',
	connection: {filename: fileURLToPath(dbPath)},
	useNullAsDefault: true
})

export default db

// const dbQuery = "SELECT * from users LIMIT 10;"
// const results = await db.raw(dbQuery)
// db.destroy()
// console.log(results)
// console.log('Finished')
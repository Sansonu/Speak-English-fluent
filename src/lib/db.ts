import Database from 'better-sqlite3'

const sqlite = new Database('db.sqlite')

export { sqlite }
export default sqlite

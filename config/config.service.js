import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve('./config/.env')})

let DB_URL = process.env.DATABASE_URL
let PORT = process.env.SERVER_PORT



export {
    DB_URL,
    PORT
}
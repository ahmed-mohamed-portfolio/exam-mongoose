
import express from 'express'
import { databaseConnection } from './database/connection.js'
import authRouter from './modules/auth/auth.controller.js'
import accountRouter from './modules/account/account.controller.js'
import { PORT } from '../config/config.service.js'


export const bootstrap = async () => {
    
    const app = express()
    app.use(express.json())

    app.use('/api/auth', authRouter)
    app.use('/api/account', accountRouter)

    await databaseConnection()

    app.use((error, req, res, next) => {
        res.json({ message: "something went wrong", error: error.message })
    })

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}` );

    })

}
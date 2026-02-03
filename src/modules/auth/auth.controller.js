import { Router } from 'express'
import { login, signUp } from './auth.service.js'

const router = Router()

const validateEmail = (req, res, next) => {
    const { email } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
        return res.json({ message: "Invalid email format" })
    }

    next()
}



router.post('/signup', validateEmail, async (req, res) => {

    let createUser = await signUp(req.body)

    res.json(createUser)

})



router.post('/login', validateEmail, async (req, res) => {

    let loginUser = await login(req.body)

    res.json(loginUser)
})


export default router
import { Router } from 'express'
import { addAmount, getUserBalance, getUserTransactions, subAmount, totalDepositsAndWithdrawals } from './account.service.js'

const router = Router()


const validateAmount = (req, res, next) => {

    if (Number(req.body.amount) <= 0) {
        return res.json({ message: "Amount must be a positive number" })
    }

    next()
}


router.post('/deposit',validateAmount, async (req, res) => {

    let { userId, amount } = req.body
    let result = await addAmount(userId, amount)
    res.json(result)

})



router.post('/withdraw', validateAmount, async (req, res) => {

    let { userId, amount } = req.body
    let result = await subAmount(userId, amount)
    res.json(result)
    
})



router.get('/balance/:userId', async (req, res) => {

    let result = await getUserBalance(req.params.userId)
    res.json(result)
    
})




router.get('/transactions/:userId', async (req, res) => {

    let result = await getUserTransactions(req.params.userId)
    res.json(result)
    
})
export default router




router.get('/summary/:userId', async (req, res) => {

    let result = await totalDepositsAndWithdrawals(req.params.userId)
    res.json(result)
    
})



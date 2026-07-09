import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { register, login } from './handlers.ts'

const router = Router()

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 10, // limit each IP to 10 requests per windowMs
})

router.post('/register', limiter, register)
router.post('/login', limiter, login)

export default router

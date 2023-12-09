import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as kitsCtrl from '../controllers/kits.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, kitsCtrl.create)
router.get('/:id', checkAuth, kitsCtrl.show)
router.put('/:id', checkAuth, kitsCtrl.update)

export { router }
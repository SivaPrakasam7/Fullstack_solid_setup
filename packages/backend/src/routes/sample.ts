import express from 'express'
import { sampleController } from 'src/controller/sample'

const router = express.Router()

router.route('/sample').get(sampleController)

export default router

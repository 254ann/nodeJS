import {Router} from "express"
//custom index page to export all routers
import eventRouter from './eventRoutes.mjs'

const router = Router()

router.use(eventRouter)

export default router
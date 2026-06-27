import { Router } from 'express'
import authRoutes from './auth.routes.js'

const indexRouter = Router()

indexRouter.use('/auth',authRoutes)

export default indexRouter
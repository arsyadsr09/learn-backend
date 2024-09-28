import { Router } from 'express'
import JwtService from '../modules/jwt.module'
import authController from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/login', authController.login)
authRoutes.post('/register', authController.register)
authRoutes.get('/users/:user_id', JwtService.jwtGetToken, authController.getUserById)

export { authRoutes }

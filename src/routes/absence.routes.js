import { Router } from 'express'
import JwtService from '../modules/jwt.module'
import absenceController from '../controllers/absence.controller'

const absencesRoutes = Router()

absencesRoutes.post('/', JwtService.jwtGetToken, absenceController.add)
absencesRoutes.get('/', JwtService.jwtGetToken, absenceController.getAll)
absencesRoutes.put('/:absence_id', JwtService.jwtGetToken, absenceController.update)

export { absencesRoutes }

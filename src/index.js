import dotenv from 'dotenv'

dotenv.config()

import { logger } from 'express-glass'
import sequelizeModule from './modules/sequelize.module'

import path from 'path'
import cors from 'cors'
import express from 'express'
import compression from 'compression'
import routes from './routes'
import globalErrorHandler from './middlewares/errorHandler.middleware'

const server = express()
server.use(compression())
server.use(express.json())
server.use(cors({ origin: '*' }))
server.use(express.urlencoded({ extended: true }))
server.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Base URL
server.get('/', (req, res) => res.send('Hello World'))

// Routes
server.use('/api/v1/auth', routes.authRoutes)
server.use('/api/v1/absences', routes.absencesRoutes)

server.use(globalErrorHandler)

const initSequelize = async () => {
	try {
		await sequelizeModule.init()

		console.log('🚀 Server initialized successfully')
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

initSequelize()

// FOR VERCEL REQUIREMENTS
server.listen(process.env.SERVER_PORT, () => console.log('[EXPRESS] Express initialized'))

logger().info('[EXPRESS] Express initialized')

module.exports = server

// (async () => {
//   try {
//     for (const module of modules) {
//       await module.init();
//     }

//     logger().info("🚀 Server initialized successfully");
//   } catch (error) {
//     logger().error(error);
//     process.exit(1);
//   }
// })();

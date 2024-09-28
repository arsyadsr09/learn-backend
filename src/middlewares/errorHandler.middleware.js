import { Request, Response, NextFunction } from 'express'
import { IsApiError, ApiError } from '../utils/ApiError'
import responseUtil from '../utils/Response'
const currentEnv = process.env.NODE_ENV || 'development'
/**
 * Global error handler for all routes
 * @param {ApiError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default (err, _req, res, next) => {
	if (res.headersSent) return next(err)
	if (IsApiError(err)) return responseUtil.fail(res, err.statusCode, `errorHandler-1:${err.type}: ${err.message}`)
	if (currentEnv === 'development') {
		return responseUtil.fail(
			res,
			500,
			`errorHandler-2${err.toString()}${err.type}: ${err.message}: ${res.toString()}:${_req.toString()}`
		)
	}
	return responseUtil.fail(res, 500, 'Something went wrong')
}

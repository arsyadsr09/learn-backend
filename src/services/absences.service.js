import { logger } from 'express-glass'
import { objectToLogStr } from '../utils/ObjectToLog'
import Absences from '../models/Absences'
import pagedData from '../utils/PagedData'
import { NotFoundError } from '../utils/ApiError'

const absenceService = {}

absenceService.getAll = async (query) => {
	logger().info(`get all absence, with query = ${objectToLogStr(query)}`)
	const pageSize = 12
	const start = query.pages ? query.pages * pageSize - pageSize : null
	const { rows: absences, count: totalItems } = await Absences.findAndCountAll({
		limit: pageSize,
		offset: start,
	})
	const totalPage = Math.ceil(totalItems / pageSize)
	logger().info('sucessfully get all absences')

	return pagedData(absences, totalItems, totalPage, Number(query.pages || 1), totalItems > start + pageSize)
}

absenceService.add = async (absence) => {
	logger().info(`add absence, absence = ${objectToLogStr(absence)}`)

	absence.is_active = true
	absence.created_at = new Date().getTime()
	const newAbsence = await Absences.create(absence)
	logger().info(`absence created, absence = ${newAbsence.id}`)

	return newAbsence
}

absenceService.update = async (absenceId, absence) => {
	logger().info(`update absence, absence = ${objectToLogStr(absence)}`)

	const existingAbsence = await Absences.findOne({ where: { absence_id: absenceId } })

	if (!existingAbsence) {
		throw new NotFoundError(`absence not found, id = ${absenceId}`)
	}

	existingAbsence.is_active = false
	existingAbsence.updated_at = new Date().getTime()
	await existingAbsence.save()
	logger().info(`absence updated, absence = ${absenceId}`)

	return existingAbsence
}

export default absenceService

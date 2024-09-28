import { Sequelize, Model } from 'sequelize'

class Absences extends Model {
	static init(sequelize) {
		super.init(
			{
				absence_id: {
					type: Sequelize.UUID,
					primaryKey: true,
					defaultValue: Sequelize.UUIDV4,
				},
				user_id: {
					type: Sequelize.UUID,
					allowNull: false,
				},
				latitude: {
					type: Sequelize.STRING(128),
					allowNull: false,
				},
				longitude: {
					type: Sequelize.STRING(128),
					allowNull: false,
				},
				is_active: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					defaultValue: true,
				},
				created_at: {
					type: Sequelize.BIGINT,
					defaultValue: new Date().getTime(),
					allowNull: false,
				},
				updated_at: {
					type: Sequelize.BIGINT,
					defaultValue: null,
				},
			},
			{
				sequelize,
				modelName: 'Absences',
				tableName: 'absences',
				createdAt: false,
				updatedAt: false,
				underscored: true,
				defaultScope: {
					order: [['created_at', 'DESC']],
				},
			}
		)

		return this
	}

	static associate(models) {
		this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
	}
}

export default Absences

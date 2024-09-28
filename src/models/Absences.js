import { DataTypes, Model } from 'sequelize'

class Absences extends Model {
	static init(sequelize) {
		super.init(
			{
				absence_id: {
					type: DataTypes.UUID,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				user_id: {
					type: DataTypes.UUID,
					allowNull: false,
				},
				latitude: {
					type: DataTypes.STRING(128),
					allowNull: false,
				},
				longitude: {
					type: DataTypes.STRING(128),
					allowNull: false,
				},
				is_active: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: true,
				},
				created_at: {
					type: DataTypes.BIGINT,
					defaultValue: new Date().getTime(),
					allowNull: false,
				},
				updated_at: {
					type: DataTypes.BIGINT,
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

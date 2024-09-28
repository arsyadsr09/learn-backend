import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Users extends Model {
	static init(sequelize) {
		super.init(
			{
				user_id: {
					type: DataTypes.UUID,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				name: {
					type: DataTypes.STRING,
				},
				email: {
					type: DataTypes.STRING,
				},
				password: {
					type: DataTypes.STRING,
				},
				phone_number: {
					type: DataTypes.STRING,
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
				modelName: 'Users',
				tableName: 'users',
				createdAt: false,
				updatedAt: false,
				underscored: true,
				defaultScope: {
					order: [['created_at', 'DESC']],
				},
			}
		)

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password = await bcrypt.hash(user.password, 8)
			}
		})

		return this
	}

	static associate(models) {
		this.hasMany(models.Absences, { foreignKey: 'page_id' })
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password)
	}
}

export default Users

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
					allowNull: false, // Assuming name is required, if not, remove this
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false, // Assuming email is required
					unique: true, // Ensures no duplicate emails
					validate: {
						isEmail: true, // Sequelize built-in validation for email format
					},
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false, // Password should always be required
				},
				phone_number: {
					type: DataTypes.STRING,
					allowNull: true, // Optional field
					validate: {
						isNumeric: true, // Ensures the phone number contains only digits
					},
				},
			},
			{
				sequelize,
				modelName: 'Users',
				tableName: 'users',
				underscored: true, // Converts camelCase to snake_case in the database
				timestamps: true, // Automatically adds createdAt and updatedAt fields
				hooks: {
					beforeSave: async (user) => {
						if (user.password) {
							user.password = await bcrypt.hash(user.password, 8) // Hash password before saving
						}
					},
				},
				defaultScope: {
					order: [['createdAt', 'DESC']],
				},
			}
		)

		return this
	}

	static associate(models) {
		this.hasMany(models.Absences, { foreignKey: 'user_id' })
	}

	// Method to check if passwords match
	async checkPassword(password) {
		return bcrypt.compare(password, this.password)
	}
}

export default Users

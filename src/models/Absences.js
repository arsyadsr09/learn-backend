import { DataTypes, Model } from 'sequelize'

class Absences extends Model {
	static init(sequelize) {
		// Define the model schema using Sequelize's modern API
		return super.init(
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
				// Sequelize will handle these timestamps automatically
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: DataTypes.NOW, // Automatically sets current timestamp
				},
				updatedAt: {
					type: DataTypes.DATE,
				},
			},
			{
				sequelize,
				modelName: 'Absences',
				tableName: 'absences',
				underscored: true, // This enables snake_case for column names
				timestamps: true, // Sequelize will now automatically manage createdAt and updatedAt
				defaultScope: {
					order: [['createdAt', 'DESC']], // You can use 'createdAt' directly with Sequelize's built-in timestamps
				},
			}
		)
	}

	static associate(models) {
		// Define the relationships here
		this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
	}
}

export default Absences
